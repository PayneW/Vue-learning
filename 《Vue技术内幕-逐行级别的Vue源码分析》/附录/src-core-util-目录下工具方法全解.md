# `src/core/util/` 目录下的工具方法全解

## 目录 (Catalog)
1. `debug.js` 
2. `env.js`
3. `error.js`
4. `index.js`
5. `lang.js`
6. `next-tick.js`
7. `options.js`
8. `perf.js`
9. `props.js`


## 生词 (New Words)
- **anonymous [ə'nɒnɪməs] --adj.匿名的，无名的**
    + It is an anonymous letter. 这是一封匿名信。
- **sequence ['sikwəns] --n.序列, 排序, 顺序**
    + in sequence. 有顺序地.
    + out of sequence. 顺序混乱地.
- **classify ['klæsɪfaɪ] --vt.分类; 归类**
    + We will classify these subjects under three topics.
      我们把这些问题分成 3 个主题.
    + We usually classify types of character as good or bad.
      我们通常把性格的类型分为善与恶.
- **handler ['hændlɚ] --n.处理者; 管理者; 处理程序.**
    + error handler. 错误处理程序.
    + termination handler. 终止处理程序.
    + call handler. 调用处理程序.
- **handle ['hændl] --v.处理; 拉手; 办理; 应付. --n.手柄; 把手.**
    + I thought I handled(vt) it. Didn't handle it. 
      我以为我能处理好, 但还是失败了.
    + Think you can handle that? - Absolutely. 你能做到吗? - 当然.
    + The handle(n) came off. 那个把手掉了.
- **invoke [ɪn'vəʊk] --vt.调用; 祈求;**
    + Immediately-Invoked Function Expression. IIFE 立即调用函数表达式。
    + By now I can no longer invoke that [excuse [ɪk'skjuːz/]. 
      现在我不能再用这个借口了。
- **reserve [rɪ'zɜːv] --v.保留，储备。 --n.贮藏，储备，保护区**
    + a reserve supply of food. 食品供应储备。
    + a reserved seat. 预订的座位。
    + I'd like to reserve a roomette. 我想预定一个小房间。
- **flush [flʌʃ] --vt&vi.冲洗, 清除. --n.脸红; 冲洗**
    + His face was flushed(vt) with shame. 他的脸因羞耻而变红.
    + flush(vt) the toilet. 用水冲洗厕所
    + a flush toilet. 冲洗式马桶.
    + hot flush(n). 脸红
    + with a flush(n) on one's face. 脸红地
    + flush DNS. 刷新 DNS

#### `next-tick.md`
- **tick [tɪk] --vt.给...标记号; 运作 --n.滴答声; 蜱(pi)虫; 一会儿; 勾号**
    + next tick queue 下一个标记队列
    + Just wait a tick! 等一下儿！
    + There was a nice red tick in the margin. 边上打了一个漂亮的红勾。
- **defer [dɪ'fɜː] --vt.延缓,延期  vi.[对人](表示敬意而)让步，服从**
    + Let's defer the decision for a few weeks. 咱们延缓几个礼拜再做决定吧。
    + I will defer going till I have more money. 
        我要延期到我有更多钱时才去。
    + defer to one's elders. 服从长辈。
- **subtle ['sʌt(ə)l] --adj.微妙的，细微的**
    + make a subtle observation. 作精细入微的观察
- **circumvent [ˌsɝkəm'vɛnt] --vt.规避; 绕行**
    + circumvented the city. 绕开城市.
- **drawback ['drɔbæk] --n.缺点, 弊端; 退税.**
    + drawback project. 缺陷工程
    + Drawback Scheme. 退税方案.
- **trade off. 卖掉; 交替使用.**
- **scenario [sə'nærɪo] --n.情节; 剧本; 方案**
- **leverage ['lɛvərɪdʒ] --n.杠杆的作用; 力量; 影响**
    + financial leverage. 财务杠杆
    + leverage ratio. 杠杆比率.
- **sequential [sɪ'kwenʃ(ə)l] --adj.连续的，顺序的**
    + sequential logic 时序逻辑
    + sequential analysis  序列分析

#### `options.js`
- **restriction  [rɪ'strɪkʃ(ə)n] --n.约束,管制**
    + For example, some countries restrict imports by quantitative 
      restriction.  例如，某一国家通过数量上的限定来限制进口。
- **strategy ['strætɪdʒɪ] --n.战略，策略**
     + option merge strategies  选项合并策略
- **duplicate ['djuːplɪkət]  --v.重复，复制。 --adj.复制，复写。--n.副本，复制品**
    + duplicate copy 副本，复制本
    + duplicate file 备份文件
    + de-duplicate hooks 重复数据删除钩子
- **de-: (前缀)离开; 除去; 否定; 倒转**
- **directive [dɪ'rektɪv] --n.指示，指令  --adj.指导的，管理的**
    + It's a directive straight from the President. 这是总统直接下达的指令。
- **assert [ə'sɜːt] --vt.断言，声称，宣称**
- **certain ['sɝtn] --adj.某些(some); 一定; 确定; 肯定. --n.某几个**
    + with certain qualifications. 附带某些条件
    + Is it certain that they will win? 他们一定会赢吗?
    + We are certain of success. 我们确信会成功.
    + He is certain to come. 他一定会来的.
- **qualification [ˌkwɒlɪfɪ'keɪʃ(ə)n]/[ˌkwɑlɪfɪ'keʃən] (发音相同)**
  **--n.资质; 合格; 条件; 限定**
    + He has no qualifications for the post. 他没有资格担任该职位.
    + with certain qualifications. 附加某些限制.
- **ancestor ['ænsɛstɚ] --n.祖先; 祖辈; 原型; 先驱**
    + My ancestors lived here, same as yours. 我的祖先生活在这里, 和你们一样.
    + ancestors who were farmers. 祖辈是农民.
- **variation [ˌvɛrɪ'eʃən] --n.变异; 变动**
    + considerable variation(s) in temperature. 相当大的气温变化
    + a temperature variation of 10. ℃ 温差十度
    + a variation in color [size]. 颜色[大小]的不同.  

    


## 内容 (Content)
### (1.) `debug.js`
- `debug.js` 文档见: `../2.6-vue-source-document/src/core/util/debug.js`
- `debug.md` 文档见: `../2.6-vue-source-document/src/core/util/debug.md`
### (2.) `env.js`
- `env.js` 文档见: `../2.6-vue-source-document/src/core/util/env.js`
- `env.md` 文档见: `../2.6-vue-source-document/src/core/util/env.md`
### (3.) `error.js`
- 同上
### (4.) `index.js`
- 同上
### (5.) `lang.js`
- 同上
### (6.) `next-tick.js`
- 同上
### (7.) `options.js`
- 同上
### (8.) `perf.js`
- 同上
### (9.) `props.js`
- 同上
