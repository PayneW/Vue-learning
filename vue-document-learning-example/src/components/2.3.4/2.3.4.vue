<template>
    <div id="Demo234" class="default-div">
        <h2>2.3.4 `.sync` 修饰符</h2>
        <text-document
            :title="article.title"
            :content="article.content"
            @update:title = "article.title = $event"
        ></text-document>
        <!-- :title.sync = "article.title" -->
    </div>
</template>
<script>
    import TextDocument from './text-document';
    export default {
        name: 'Demo234',
        data() {
            return {
                article: {
                    title: "人生八苦",
                    content: "人生八苦是指: 生, 老, 病, 死, 求不得," +
                        " 怨憎会, 爱别离, 五阴盛.",
                }
            }
        },
        components: {
            TextDocument,
        }
    }
</script>
