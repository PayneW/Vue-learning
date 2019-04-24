# vue-music-webapp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




### ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- [stylus 官网](https://stylus.bootcss.com/)
    + 安装 stylus: npm install stylus stylus-loader --save-dev

- 安装原生 jsonp 实现库 (原生 jsonp 代码讲解: js-sundry-goods\JS-实现效果\2019-01-20-手写JSONP\jsonp.html)
    + npm install jsonp --save

- 安装 better-scroll (滚动插件)
    + npm install better-scroll --save

- 安装 express 和 axios
    + npm install express --save-dev
    + npm install axios --save

- 原生 JSONP 实现: js-sundry-goods\JS-实现效果\2019-01-20-手写JSONP\ jsonp.html

- better-scroll 拷贝后的总轮播数量: 1152872 1154037 1146132 1142970 1135055 1152872 1154037

- 4-12 vue-lazyload 图片懒加载插件
    + npm install vue-lazyload --save

- 安装 js-base64: npm install js-base64 --save
- 安装 express 的中间件 body-parser
    + npm install body-parser --saver
    + body-parser 的作用是对 post 请求的请求体进行解析。使用非常简单，一下两行代码已经覆盖了大部分的使用场景。
        - `app.use(bodyParser.json())`
        - `app.use(bodyParser.urlencoded({extended: false}))`;

- 7-20 安装 lyric-parser : npm install lyric-parser --save


### ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- 组件的相互引用
    + singer.vue (歌手页面) 导入的组件有
        - listview.vue (左边的歌手列表 + 右侧的快捷列表 "热-A-Z")
            + loading.vue
        - <router-view></router-view> : router-view 中的跳转是在 listview.vue 中给歌手
             `<li
                v-for="item in group.items"
                class="list-group-item"
                @click="selectItem(item)">
                <!-- 5-4:  4-12 视频中有讲解 -->
                <img  class="avatar" v-lazy="item.avatar">
                <span class="name">{{item.name}}</span>
             </li>`
             添加 selectItem(item) 事件，然后在
             `methods: {
                 selectItem(item) {
                    this.$emit("select", item)
                 }
             }`
             通过 this.$emit 发送到父级 singer.vue 中接收 `<ListView :data="singers" @select="selectSinger"></ListView>` 事件


    + singer-detail.vue (歌手详情页面 (即: 点击 歌手页面 跳转的当前歌手的详情和曲目页面))
        - music-list.vue (每个歌手的--"歌曲列表"页面) 导入的组件有
            + Scroll.vue
            + song-list.vue (song-list 封装 "歌曲列表" 基础组件)
            + loading.vue


















