- todo.vue 为父组件
  + item.vue 和 tabs.vue 为子组件
  + 注: 详细示例见同仓库: Vue-learning\20190130-vue-todo-list
  
  
- props 验证
    + 验证传入的 props 参数的数据规格，如果不符合数据规格，Vue 会发出警告。
    + 能判断的所有种类 (也就是 type 值)有: String, Number, Boolean, Function, Object, Array, Symbol
    + ```vue
          props: {
              // 基础类型检测, null意味着任何类型都行
              propA: Number,
        
              // 多种类型
              propB: [String, Number],
        
              // 必传且是String
              propC: {
                type: String,
                required: true
              },
        
              // 数字有默认值
              propD: {
                type: Number,
                default: 101
              },
        
              // 数组、默认值是一个工厂函数返回对象
              propE: {
                type: Object,
                default: function() {
                  console.log("propE default invoked.");
                  return { message: "I am from propE." };
                }
              },
        
              // 自定义验证函数
              propF: {
                isValid: function(value) {
                  return value > 100;
                }
              }
        
            }
          });
      ``` 