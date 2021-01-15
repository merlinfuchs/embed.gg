<template>
    <div class="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8 pt-10">
        <div class="lg:grid lg:grid-cols-5 lg:gap-6">
            <div class="lg:col-span-2">
                <div class="px-4 sm:px-0">
                    <h1 class="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100">Embed Creator</h1>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Links created with this app are embeddable on twitter, discord, facebook and some other
                        websites.
                        All relevant data is stored on the Cloudflare Edge for up to 30 days. <br>
                        <a href="https://github.com/merlinfuchs/embed.gg" target="_blank" class="text-blue-400 font-semibold">Source Code</a>
                    </p>
                </div>
                <discord-preview class="mt-5 mx-4 sm:mx-0" :data="embedData"/>
                <twitter-preview class="mt-5 mx-4 sm:mx-0" :data="embedData"/>
                <facebook-preview class="mt-5 mx-4 sm:mx-0"/>
            </div>
            <div class="mt-5 lg:mt-0 lg:col-span-3">
                <div>
                    <div class="shadow sm:rounded-md sm:overflow-hidden dark:text-gray-100">
                        <div class="px-4 py-5 bg-white dark:bg-gray-800 space-y-6 sm:p-6">
                            <div class="grid grid-cols-3 gap-6">
                                <div class="col-span-3">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Title
                                    </label>
                                    <div class="mt-1 flex rounded-md shadow-sm">
                                        <input type="text" v-model="title"
                                               class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300 dark:border-gray-800 dark:bg-gray-900"
                                               placeholder="My Embed">
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-3 gap-6">
                                <div class="col-span-3">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Site Name
                                    </label>
                                    <div class="mt-1 flex rounded-md shadow-sm">
                                        <input type="text" v-model="site_name"
                                               class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300 dark:border-gray-800 dark:bg-gray-900"
                                               placeholder="embed.gg">
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-3 gap-6">
                                <div class="col-span-3">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Color
                                    </label>
                                    <div class="mt-1 flex rounded-md shadow-sm">
                                        <input type="text" v-model="color"
                                               class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 dark:border-gray-800 dark:bg-gray-900"
                                               placeholder="#000">
                                        <input v-model="color" type="color"
                                               class="rounded-r-md border border-l-0 border-gray-300 dark:border-gray-800 h-10">
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-3 gap-6">
                                <div class="col-span-3">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Website
                                    </label>
                                    <div class="mt-1 flex rounded-md shadow-sm">
                                        <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm dark:border-gray-800 dark:bg-gray-700">
                                          https://
                                        </span>
                                        <input type="text" v-model="urlRaw"
                                               class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 dark:border-gray-800 dark:bg-gray-900"
                                               placeholder="google.com">
                                    </div>
                                    <p class="mt-2 text-sm text-gray-500">
                                        The embed link will redirect to this URL
                                    </p>
                                </div>
                            </div>

                            <div class="grid grid-cols-3 gap-6">
                                <div class="col-span-3">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Image URL
                                    </label>
                                    <div class="mt-1 flex rounded-md shadow-sm">
                                        <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm dark:border-gray-800 dark:bg-gray-700">
                                          https://
                                        </span>
                                        <input type="text" v-model="imageRaw"
                                               class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 dark:border-gray-800 dark:bg-gray-900"
                                               placeholder="i.imgur.com/Spojet2.jpeg">
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-3 gap-6">
                                <div class="col-span-3">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Video URL
                                    </label>
                                    <div class="mt-1 flex rounded-md shadow-sm">
                                        <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm dark:border-gray-800 dark:bg-gray-700">
                                          https://
                                        </span>
                                        <input type="text" v-model="videoRaw"
                                               class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 dark:border-gray-800 dark:bg-gray-900"
                                               placeholder="myvideo.com/abzl32.mp4">
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Description
                                </label>
                                <div class="mt-1">
                                    <textarea rows="3" v-model="description"
                                              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md dark:border-gray-800 dark:bg-gray-900"
                                              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-right sm:px-6">
                            <transition name="fade">
                                <div class="mt-1 flex rounded-md shadow-sm" v-if="savedID">
                                    <input type="text" v-model="embedURL" ref="embedURLInput"
                                           class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">

                                    <button type="submit" @click="copyEmbedURL"
                                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Copy
                                    </button>
                                </div>
                                <button type="submit" @click="saveEmbed" v-else
                                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Save
                                </button>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import DiscordPreview from './DiscordPreview'
    import FacebookPreview from './FacebookPreview'
    import TwitterPreview from './TwitterPreview'

    export default {
        components: {DiscordPreview, FacebookPreview, TwitterPreview},
        data() {
            return {
                title: '',
                site_name: '',
                description: '',
                url: '',
                color: '#4287f5',
                image: '',
                video: '',

                savedID: null
            }
        },
        methods: {
            saveEmbed() {
                fetch('/', {method: 'POST', body: JSON.stringify(this.embedData)})
                    .then(resp => resp.json())
                    .then(data => this.savedID = data.id)
            },
            copyEmbedURL() {
                this.$refs.embedURLInput.select()
                document.execCommand('copy')
                setTimeout(() => this.savedID = null, 1000)
            }
        },
        computed: {
            colorRaw: {
                get() {
                    return '#' + this.color.toString(16)
                },
                set(newValue) {
                    this.color = parseInt(newValue.substring(1), 16)
                }
            },
            urlRaw: {
                get() {
                    return this.url.replace(/^https:\/\//i, '')
                },
                set(newValue) {
                    this.url = 'https://' + newValue.replace(/^https:\/\//i, '')
                }
            },
            imageRaw: {
                get() {
                    return this.image.replace(/^https:\/\//i, '')
                },
                set(newValue) {
                    this.image = 'https://' + newValue.replace(/^https:\/\//i, '')
                }
            },
            videoRaw: {
                get() {
                    return this.video.replace(/^https:\/\//i, '')
                },
                set(newValue) {
                    this.video = 'https://' + newValue.replace(/^https:\/\//i, '')
                }
            },
            embedURL: {
                get() {
                    return `https://embed.gg/${this.savedID}`
                },
                set() {
                    this.$forceUpdate()
                }
            },
            embedData() {
                return {
                    title: this.title,
                    site_name: this.site_name,
                    description: this.description,
                    url: this.url,
                    color: this.color,
                    image: this.image,
                    video: this.video
                }
            }
        }
    }
</script>
<style>

</style>