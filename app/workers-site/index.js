import {getAssetFromKV, serveSinglePageApp} from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
    try {
        event.respondWith(handleEvent(event))
    } catch (e) {
        event.respondWith(new Response('Internal Error', {status: 500}))
    }
})

const STATIC_ROUTES = [
    {
        path: /^\/m\/([A-Z0-9]+)\/?/i,
        methods: ['GET'],
        callable: forward
    },
    {
        path: /^\/?$/i,
        methods: ['POST'],
        callable: createEmbed
    },
    {
        path: /^\/([A-Z0-9]+)\/?$/i,
        methods: ['GET'],
        callable: renderEmbed
    }
]

async function handleEvent(event) {
    const request = event.request
    const {pathname} = new URL(request.url)
    for (const {path, methods, callable} of STATIC_ROUTES) {
        const match = pathname.match(path)
        if (match && methods.includes(request.method.toUpperCase())) {
            return callable(event, match.slice(1))
        }
    }

    let options = {
        mapRequestToAsset: serveSinglePageApp,
        cacheControl: {
            bypassCache: true,
        }
    }

    try {
        return await getAssetFromKV(event, options)
    } catch (e) {
        try {
            let notFoundResponse = await getAssetFromKV(event, {
                mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
            })

            return new Response(notFoundResponse.body, {...notFoundResponse, status: 404})
        } catch (e) {
            event.respondWith(new Response('Internal Error', {status: 500}))
        }
    }
}

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        headers: {'Content-Type': 'application/json'},
        status: status
    })
}

async function forward(event, params) {
    return Response.redirect(`https://api.discord.club/mini/${params[0]}`, 308)
}

async function createEmbed(event) {
    const payload = await event.request.json()
    const embedID = Date.now().toString(36) + Math.floor(Math.random() * 100).toString(36)
    await KV.put(`embeds:${embedID}`, JSON.stringify(payload), {expirationTtl: 60 * 60 * 24 * 30})
    return jsonResponse({id: embedID})
}

async function renderEmbed(event, params) {
    const embedID = params[0]
    const rawEmbed = await KV.get(`embeds:${embedID}`)
    if (!rawEmbed) {
        return new Response('Not Found', {status: 404})
    }

    const embed = JSON.parse(rawEmbed)
    let baseResponse = await getAssetFromKV(event, {
        mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/embed.html`, req),
    })

    class AttributeRewriter {
        constructor(attr) {
            this.attr = attr
        }

        element(element) {
            if (element.getAttribute('ignore')) {
                element.removeAttribute('ignore')
                return
            }
            const field = element.getAttribute(this.attr)
            const value = embed[field]
            if (value) {
                element.setAttribute(this.attr, value)
            } else {
                element.remove()
            }
        }
    }

    // we don't want redirection loops
    let redirectURL
    try {
        // we don't want redirect loops
        const parsed = new URL(embed.url)
        if (parsed.hostname === 'embed.gg') {
            redirectURL = 'https://embed.gg'
        } else {
            redirectURL = parsed.href
        }
    } catch (e) {
        redirectURL = 'https://embed.gg'
    }

    return new HTMLRewriter()
        .on('meta', new AttributeRewriter('content'))
        .on('a', new AttributeRewriter('href'))
        .on('title', {element: e => e.setInnerContent(embed.title)})
        .on('script#redirect', {
            element: e =>
                e.setInnerContent(`window.onload = () => window.location.replace('${redirectURL}')`, {html: true})
        })
        .transform(baseResponse)
}