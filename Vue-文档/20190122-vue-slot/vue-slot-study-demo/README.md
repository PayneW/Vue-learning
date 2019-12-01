## Slot 插槽 
 - single-slot 单个插槽
 - named-slots 具名插槽: 将某个名字的内容插到子组件 slot 对应的名字里去
 - scoped-slots 作用域插槽: 将子组件的值传到父组件以供使用
    + 0、[详细文章](https://www.jianshu.com/p/a0a83029a217)
    + 1、"组件"和"插槽"
        - 父组件通过 Prop 向子组件传递数据，通过插槽向子组件传递内容。他们的
        共同点都是从上 (父) 向下 (子) 传递数据。区别是: Prop 传递的是组件
        的属性，而插槽是传递 VNode 节点。
    + 2、作用域插槽: 
        - 那作用域插槽呢？它是跟上面两者传输数据的方向相反，是下 (子）向上（父）
        传递数据；我们回头看看官网的描述: '可从子组件获取数据'，正式说明这种关系。
        - 那么它跟插槽有什么关系呢？因为数据像是“绑定”在子组件的插槽上，哪个VNode
        节点插入到该插槽上，那个节点能拿到子组件传递上来的数据，那么 slot-scope 
        属性指定的值，就是我们用于接收数据的变量。     

## ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


# vue-slot-study-demo

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
