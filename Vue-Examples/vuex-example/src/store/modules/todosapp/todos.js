// - Todos

const STORAGE_KEY = 'todos-vuejs';

export default {
    state() {
        return {
            todos: [
                {text: '工作', done: true},
                {text: '吃饭', done: false}
            ]
        }
    },
    getters: { },
    mutations: {
        // - 添加 todo
        addTodo(state, todo) {
            state.todos.push(todo)
        },
        // - 移除 todo
        removeTodo(state, todo) {
            state.todos.splice(state.todos.indexOf(todo), 1)
        },
        // - 编辑 todo
        editTodo(state, {todo, text = todo.text, done = todo.done}) {
            // console.log('todo:', todo);
            console.log('text: ', text);
            console.log('done: ', done);
            const index = state.todos.indexOf(todo)
            // - (1) 0. (2) 1.
            console.log('index: ', index);

            // - { ...todo, text, done } 为利用 ES6 的扩展运算符合并对象
            state.todos.splice(index, 1, {
                ...todo,
                text,
                done
            })

            // - 上面一步, 把 state.todos 数组内的每一项通过循环, 都删除后, 添加通过
            //   toggleAll 选项的
            console.log('state.todos: ', state.todos);
        }
    },
    actions: {
        // - 添加 todo
        addTodo({ commit }, text) {
            commit('addTodo', {
                text,
                done: false
            })
        },
        // - 移除 removeTodo
        removeTodo({ commit }, todo) {
            commit('removeTodo', todo)
        },
        // - 切换 todo 状态
        toggleTodo({ commit }, todo) {
            commit('editTodo', {todo, done: !todo.done})
        },
        // - 编辑 todo
        editTodo({ commit }, { todo, value }) {
            commit('editTodo', { todo, text: value})
        },
        // - 切换全部 todos 状态
        // - 第二个参数 done 为页面中点击 toggleAll 全选/反选 时传入的,
        toggleAll({ state, commit}, done) {
            state.todos.forEach((todo) => {
                // - 下面的 (1) 和 (2) 输出, 是打开页面第一次点击 `toggleAll` 时
                //   全部选中的输出, 如果再次点击就为 "全部取消选中", 那 (1) 和 (2)
                //   的 done 都为 false
                // - (1) 'todo:' -> {done: true, text: "工作"}
                //       'done:' -> true
                // - (2) 'todo:' -> {done: false, text: "吃饭"}
                //       'done:' -> true
                // console.log('todo: ->', todo);
                // console.log('done ->', done);

                // - 调用 mutations 内的 editTodo, 把 todo 和 done 当做参数传入
                commit('editTodo', {todo, done})
            })
        },
        // - 清除已完成
        clearCompleted({ state, commit }) {
            state.todos.todos.filter(todo => todo.done)
                .forEach(todo => {
                    commit('removeTodo', todo)
                })
        }
    }
}
