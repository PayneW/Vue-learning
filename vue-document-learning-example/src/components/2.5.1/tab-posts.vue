<template>
    <div id="tab-posts">
        <ul class="article-title">
            <!-- 如果 post === selectedPost 那么添加 selected 样式 -->
            <li
                v-for="(post, index) in posts"
                :key="index"
                @click="selectedPost = post"
                :class="{selected: post === selectedPost}"
            >
                {{ post.title }}
            </li>
        </ul>
        <div class="article-content">
            <div v-if="selectedPost" class="selected-post">
                <h3>{{ selectedPost.title }}</h3>
                <div v-html="selectedPost.content"></div>
            </div>
            <strong v-else>
                Click on a blog title to the left to view it.
            </strong>
        </div>
    </div>
</template>
<script>
    export default {
        name:'TabPosts',
        data() {
            return {
                posts: [
                    {
                        id: 1,
                        title: 'Cat Ipsum',
                        content: '<p>Dont wait for the storm to pass, ' +
                            'dance in the rain kick up litter decide to want nothing to do with' +
                            ' my owner today demand to be let outside at once.</p>'
                    },
                    {
                        id: 2,
                        title: 'Hipster Ipsum',
                        content: '<p>Bushwick blue bottle scenester helvetica ugh.</p>'
                    },
                    {
                        id: 3,
                        title: 'Cupcake Ipsum',
                        content: '<p>Icing dessert soufflé lollipop chocolate bar' +
                            'sweet tart cake chupa chups.</p>'
                    }
                ],
                selectedPost: null,
            }
        }
    }
</script>
<style scoped>
    #tab-posts {
        padding: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
    }
    .article-title {
        padding-right: 10px;
    }
    .article-title li {
        line-height: 26px;
        cursor: pointer;
        white-space: nowrap;
        padding: 0 5px 0 5px;
    }
    .article-title li.hover {
        background: #eee;
    }
    .article-title li.selected {
        background: lightgray;
    }

    .article-content {
        padding-left: 10px;
        border-left: 1px solid #ccc;
    }
</style>
