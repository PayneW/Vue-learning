// - classify regular expression. 对正则表达式进行分类
// - `(?:^|[-_])`: 非捕获型分组(不需要获取供以后使用), 内部的 `^|[-_]`
//   表示匹配以字符串开头或者 `- / _` 字符, 如果其后还有正则, 那么必须出现在
//   字符串开始或 `- / _` 字符之后.(Tip: 这里到底对不对? 不知道...)
// - `^|`: 匹配以 `|`开头
// - `[-_]`: 匹配 `-` 或 `_`
// - `(\w)`: 捕获型分组, 分组内匹配 "字母, 数字, 下划线"
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = str => str.replace(classifyRE, c => c.toUpperCase())
    .replace(/[-_]/g, '');
console.log(classify('aaa-bbb-ccc'));   // AaaBbbCcc