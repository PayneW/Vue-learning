# 第 3 章 -- Array 的变化侦测

## 本章目录 (Catalog)
- 3.1 如何追踪变化
- 3.2 拦截器
- 3.3 使用拦截器覆盖 Array 原型
- 3.4 将拦截器方法挂载到数组的属性上
- 3.5 如何收集依赖
- 3.6 依赖列表存在哪儿
- 3.7 收集依赖
- 3.8 在拦截器中获取 Observer 实例
- 3.9 向数组的依赖发送通知
- 3.10 侦测数组中元素的变化
- 3.11 侦测新增元素的变化
    + 3.11.1 获取新增元素
    + 3.11.2 使用 Observer 侦测新增元素
- 3.12 关于 Array 的问题
- 3.13 总结




## 生词 (New Words)
- **segment ['sɛɡmənt] --n.段,部分. --vt&vi.分割**
    + To divide a computer program into segment. 把一个计算机程序分成若干段.
    + the segments(n) of an orange. 柑橘的一瓣瓣



## 内容 (Content)
-  