# Vue learning

- MVVM 模式
    + M: Model 数据模型
    + V: view 视图模板
    + VM: view-model 视图模型
- If people can't build monoliths properly, microservices won't help.
  -- Simon Brown  
  如果你连单体应用都写不好, 微前端也帮不上什么忙.


## Table Of Contents
1. 尤雨溪(Evan You) 谈 Vue 3.0 Beta



## New Words
- **usable ['jʊzəbl] (= useable)--adj.可用的; 使用的; 方便的.**
    + useable partition. 有效分类.
    + useable income. 可用收入.
- **alongside [ə'lɔŋ'saɪd] --prep.在...旁边; 与...一起. --adv.在旁边.**
    + Usable alongside(prep) existing Options API.
      可与现有的 Options API 一起使用.
    + If you stay alongside(prep) of me you won't get hurt.
      你若在我身边, 就不会受伤害. (alongside of... 与...并肩; 在旁边)
- **flexible ['flɛksəbl] --adj.灵活的; 柔韧的; 易弯曲的.**
    + We should stick to the principles and be flexible as well.
      既要有原则性, 也要有灵活性.
    + flexible packaging. 软包装.
- **reactivity [ˌriæk'tivəti] --n.反应性; 反应.**
    + vascular reactivity. 血管反应性.
    + Reactivity module can be used as a standalone library.
      响应式(Vue.js)模块可以作为独立库.
- **implement ['ɪmplɪm(ə)nt] --vt.实现, 执行, 落实. --n.工具, 设备**
    + How do we implement this? 那我们怎么来执行呢？
    + How do you implement this practice? 您如何执行这个实践?
    + Otherwise, you would have to implement this feature yourself. 
      否则, 您就需要自己想办法实现这个特性. 
- **planned [plænd] --adj.计划了的; 根据计划的.**
    + a planned economy. 计划经济.
    + a planned crime. 有计划的犯罪.
- **integration [ɪntɪ'greɪʃ(ə)n] --n.集成, 综合**


## Content
### 1. 尤雨溪(Evan You) 谈 Vue 3.0 Beta
- RFCs: https://live.bilibili.com/22155512
- Vue 3.0 Template Explorer:
  https://vue-next-template-explorer.netlify.app
- Vue Composition API: https://composition-api.vuejs.org/api.html#setup

- cache Handlers (缓存处理程序)
#### Vue 3 core status: beta ready (Vue 3 核心状况: Beta 版本就绪) [PPT]
- (1) What this means:
    + (1.1) All planned RFCs merged & implemented
      (合并并实施所有已计划好的 RFCs)

      RFCs(Request For Comments 请求注解/请求评论).

      Vue 3 的 RFC 仓库: [vuejs/rfcs](https://github.com/vuejs/rfcs)

      每一个 RFC, 仓库中都做了排序, 截图如下:

       <img src="./Vue-learning-images/vue-rfc.png"
            style="margin-left: 0; border-radius: 4px;
            box-shadow: 1px 1px 3px 2px #e5e5e5">

    + (1.2) Focus is now on stability and library integrations.
      ((Beta 阶段的)现在的重点是稳定性和库集成.)
- (2) Highlights: (突出显示/高亮)
    + (2.1) Performance (性能)
    + (2.2) Tree-Shaking support (摇树?支持)
    + (2.3) Composition API (合成/组合 API)
        + (1) Usable alongside existing Options API
          (可与现存的 Options API 一起使用)
        + (2) Flexible logic composition and reuse
          (灵活的逻辑组合和复用)
        + (3) Reactivity module can be used as a standalone library
          (响应式模块可以作为一个独立库.) 
          (tip: Vue 官网文档的 "Reactivity in Depth(深入响应式原理)"
          用的就是 Reactivity 而不是 Response)
    + (2.4) Fragment, Teleport, Suspense (文档片段, 传送, )
    + (2.5) Better TypeScript support (对 TS 更好的支持)
    + (2.6) Custom Renderer API (自定义渲染 API)
    




 