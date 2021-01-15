<template>
    <div class="embed" v-bind:style="{borderColor: data.color}">
        <div class="embed-body">
            <div class="provider" v-if="data.site_name">{{data.site_name}}</div>
            <span class="title" v-if="data.title">
                <a :href="data.url" target="_blank" class="title-content">{{data.title}}</a>
            </span>
            <div class="description">
                <div class="description-content" v-if="data.description">{{data.description}}</div>
            </div>
            <video v-if="data.video.replace(/https:\/\//i, '')" alt="video"
                   class="video">
                <source :src="data.video"/>
            </video>
            <div class="thumbnail" v-if="data.image.replace(/https:\/\//i, '')">
                <img :src="data.image" alt="image">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['data']
    }
</script>

<style scoped>
    .embed {
        place-self: start;
        text-align: left;
        max-width: 520px;
        display: grid;
        background: #2f3136 none repeat scroll 0 0;
        border-radius: 4px;
        border-left: 4px solid rgb(32, 34, 37);
    }

    .embed-body {
        padding: 0.5rem 1rem 1rem 0.75rem;
        display: inline-grid;
        grid-template-columns: auto;
        grid-template-rows: auto;
    }

    .provider {
        font-size: 0.75rem;
        line-height: 1rem;
        font-weight: 400;
        grid-column: 1/1;
        color: #dcddde;
        margin-top: 8px;
    }

    .title-content {
        font-size: 1rem;
        font-weight: 600;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        line-height: 1.375;
    }

    .title {
        min-width: 0px;
        display: inline-block;
        margin: 8px 0px 0px;
        grid-column: 1 / 2;
    }

    .title a {
        color: rgb(0, 176, 244);
    }

    .title span {
        color: rgb(255, 255, 255);
    }

    .description {
        min-width: 0px;
        margin: 8px 0px 0px;
        grid-column: 1 / 2;
    }

    .description-content {
        font-size: 0.875rem;
        color: rgb(220, 221, 222);
        line-height: 1.125rem;
        white-space: pre-line;
        overflow-wrap: break-word;
    }

    .video {
        min-width: 0px;
        max-width: 400px;
        max-height: 300px;
        margin: 16px 0px 0px;
        border-radius: 4px;
        cursor: pointer;
        grid-column: 1 / 3;
    }

    .thumbnail {
        margin: 8px 0px 0px 16px;
        grid-area: 1 / 2 / 8 / 3;
        justify-self: end;
        cursor: pointer;
    }

    .thumbnail img {
        max-width: 80px;
        max-height: 80px;
        border-radius: 4px;
    }
</style>