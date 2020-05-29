# Vuepress 

## 目录 (Catalog)
1. [VuePress 文档](https://v1.vuepress.vuejs.org/zh/guide/getting-started.html)
1. 顺序功能流程图 (Sequential function chart `SFC`)
1. [Intro to VuePress 1.x. (VuePress 1.x 简介)](https://ulivz.com/2019/06/09/intro-to-vuepress-1-x/)


## 生词 (New Words)
- **sequential [sɪ'kwenʃ(ə)l] --adj.连续的，顺序的**
    + sequential logic 时序逻辑
    + sequential analysis  序列分析
- **wikipeida [viki'pidi:ə] (为K皮地额)--维基百科**
    + Or do you prefer accessing Wikipedia via the web?
      或者你更喜欢通过网络浏览维基百科?
- **deactivate [diː'æktɪveɪt] --vt.使无效，停用**
    + deactivate breakpoints 停用断点



## 内容 (Content)
#### 1. VuePress 文档
- [VuePress 文档](https://v1.vuepress.vuejs.org/zh/guide/getting-started.html)

#### 2. 顺序功能流程图 (Sequential function chart `SFC`)
- [来源-Wikipedia](https://zh.wikipedia.org/wiki/%E9%A0%86%E5%BA%8F%E5%8A%9F%E8%83%BD%E6%B5%81%E7%A8%8B%E5%9C%96)
- `顺序功能流程图 (Sequential function chart)` 简称 `SFC`, 是为
  `可编程逻辑控制器(PLC)` 开发的图形编程语言, 是 `IEC_61131-3` 标准定义的 5 种语言之一.
  顺序功能流程图是以 `GRAFCET` 为基础, 而后者又 以 `Petri 网` 为基础.
  
  <img src="./vuepress-images/Sequential_function_chart.png"
    style="margin-left: 0;">
  
  [顺序功能流程图]

  It can be used to program process that can be split into steps.
  (它常被用于那种可以分为以下多个步骤的程序的处理.)

  顺序功能流程图的主要成分有:
    + 步骤及其相关的动作.
    + 转态及其相关的逻辑条件.
    + 步骤及转换之间的连结.
  
  顺序功能流程图中的步骤可以是 `有效(active)` 或 `无效(inactie)`.
  只会执行有效步骤中的动作，步骤可以依以下任一个方式变为有效。
    + It is an initial step as specified by the programmer. 
      (它是由程序员指定的初始步骤.)
    + It was activated during a scan cycle and not deactivated since.
      (它在扫描周期中已激活, 此后未禁用.)
  
  若有一个步骤，在它前面的所有步骤都是有效的，而且连接到此步骤的转态条件成立, 
  此步骤会有效。若进行了一个转态，所有之前的步骤都会失效，而转态后的步骤会有效。

  和步骤有关的动作可以包括许多种类，最常见的是`连续(N)`,`设定(S)`及`清除(R)`.
  其中 `N(连续)` 会确保只要此动作有效, 对应的目标变数会恒为1.
  SFC 的规则提到若有二个步骤对同一个目标变数进行动作N, 此变数永远不会清除为零。
  动作也可以整合 `LD(阶梯图)` 的程式进来。

  顺序功能流程图在本质上是平行处理的语言，多个控制流程可以同时有效。

  此语言有些非标准的动作, 包括 "宏动作",
  也就是一个程式单元的动作可以影响另一个程式单元的状态 最常见的宏动作是 "forcing",
  由一个程序运作单元决定另一个程序运作单元的有效步骤。

### 3. Intro to VuePress 1.x. (VuePress 1.x 简介)
- [Intro to VuePress 1.x. (VuePress 1.x 简介)](https://ulivz.com/2019/06/09/intro-to-vuepress-1-x/)