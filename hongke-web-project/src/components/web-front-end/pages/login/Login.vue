<template>
    <div class="login">
        <audio ref="audio" class="the-audio"></audio>
        <button @click="changeUrl">Click me</button>
    </div>
</template>

<script>
    const musicList = [
        'http://ws.stream.qqmusic.qq.com/108756223.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/101787871.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/718475.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/108756223.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/101787871.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/718475.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/108756223.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/101787871.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/718475.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/108756223.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/101787871.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/718475.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/108756223.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/101787871.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/718475.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/108756223.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/101787871.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/718475.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/108756223.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/101787871.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/718475.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/108756223.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/101787871.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/718475.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/108756223.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/101787871.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/718475.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/108756223.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/101787871.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/718475.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/108756223.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/101787871.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/718475.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/108756223.m4a?fromtag=46',
        'http://ws.stream.qqmusic.qq.com/101787871.m4a?fromtag=46',

    ];

    export default {
        name: "login",
        data() {
            return {
                index: 0,
                url: ""
            }
        },
        // 点击按钮时会调用 changeUrl 方法，修改 url ，然后 watcher 的回调函数执行，并调用
        // audio 的 play 方法。
        methods: {
            changeUrl() {
                // 1除以3的商是0，余数自然是1。那么2除以3的商也是0，余数是2。
                // 一个数除以另一个数，要是比另一个数小的话，余数就是它自己。
                this.index = (this.index + 1) % musicList.length;

                console.log("this.index: ", this.index);
                this.url = musicList[this.index];
            }
        },
        // watch 监听 url 变化
        watch: {
            url(newUrl) {
                this.$refs.audio.src = newUrl;
                this.$refs.audio.play();
            }
        }
    }
</script>

<style lang="scss">
    .login {
        min-height: 900px;
        background: #ccc;
    }
    .the-audio {
        display: block;
        width: 500px;
        height: 400px;
        border: 1px solid #ccc;
        margin: 10px auto;
        background: #fff;
    }
    button {
        width: 200px; height: 36px;
        border:0; border-radius: 4px;
        background: lightseagreen;
    }
</style>
