import {
  readFile,
  readObject,
  compileVue,
  compileWithDeps,
  createInstance,
  addTaskHook,
  resetTaskHook,
  getRoot,
  getEvents,
  fireEvent
} from '../helpers'

// Create one-off render test case
function createRenderTestCase (name) {
  const source = readFile(`${name}.vue`)
  const target = readObject(`${name}.vdom.js`)
  return done => {
    compileVue(source).then(code => {
      const id = String(Date.now() * Math.random())
      const instance = createInstance(id, code)
      setTimeout(() => {
        expect(getRoot(instance)).toEqual(target)
        instance.$destroy()
        done()
      }, 50)
    }).catch(done.fail)
  }
}

// Create event test case, will trigger the first bind event
function createEventTestCase (name) {
  const source = readFile(`${name}.vue`)
  const before = readObject(`${name}.before.vdom.js`)
  const after = readObject(`${name}.after.vdom.js`)
  return done => {
    compileVue(source).then(code => {
      const id = String(Date.now() * Math.random())
      const instance = createInstance(id, code)
      setTimeout(() => {
        expect(getRoot(instance)).toEqual(before)
        const event = getEvents(instance)[0]
        fireEvent(instance, event.ref, event.type, {})
        setTimeout(() => {
          expect(getRoot(instance)).toEqual(after)
          instance.$destroy()
          done()
        }, 50)
      }, 50)
    }).catch(done.fail)
  }
}

describe('Usage', () => {
  describe('render', () => {
    it('sample', createRenderTestCase('render/sample'))
    it('class', createRenderTestCase('render/class'))
  })

  describe('event', () => {
    it('click', createEventTestCase('event/click'))
  })

  describe('recycle-list', () => {
    it('text node', createRenderTestCase('recycle-list/text-node'))
    it('attributes', createRenderTestCase('recycle-list/attrs'))
    // it('class name', createRenderTestCase('recycle-list/classname'))
    it('inline style', createRenderTestCase('recycle-list/inline-style'))
    it('v-if', createRenderTestCase('recycle-list/v-if'))
    it('v-else', createRenderTestCase('recycle-list/v-else'))
    it('v-else-if', createRenderTestCase('recycle-list/v-else-if'))
    it('v-for', createRenderTestCase('recycle-list/v-for'))
    it('v-for-iterator', createRenderTestCase('recycle-list/v-for-iterator'))
    it('v-on', createRenderTestCase('recycle-list/v-on'))
    it('v-on-inline', createRenderTestCase('recycle-list/v-on-inline'))
    it('v-once', createRenderTestCase('recycle-list/v-once'))

    it('stateless component', done => {
      compileWithDeps('recycle-list/todo-components/stateless.vue', [{
        name: 'banner',
        path: 'recycle-list/todo-components/banner.vue'
      }]).then(code => {
        const id = String(Date.now() * Math.random())
        const instance = createInstance(id, code)
        setTimeout(() => {
          const target = readObject('recycle-list/todo-components/stateless.vdom.js')
          expect(getRoot(instance)).toEqual(target)
          instance.$destroy()
          done()
        }, 50)
      }).catch(done.fail)
    })

    it('stateless component with props', done => {
      compileWithDeps('recycle-list/todo-components/stateless-with-props.vue', [{
        name: 'poster',
        path: 'recycle-list/todo-components/poster.vue'
      }]).then(code => {
        const id = String(Date.now() * Math.random())
        const instance = createInstance(id, code)
        setTimeout(() => {
          const target = readObject('recycle-list/todo-components/stateless-with-props.vdom.js')
          expect(getRoot(instance)).toEqual(target)
          instance.$destroy()
          done()
        }, 50)
      }).catch(done.fail)
    })

    it('multi stateless todo-components', done => {
      compileWithDeps('recycle-list/todo-components/stateless-multi-todo-components.vue', [{
        name: 'banner',
        path: 'recycle-list/todo-components/banner.vue'
      }, {
        name: 'poster',
        path: 'recycle-list/todo-components/poster.vue'
      }, {
        name: 'footer',
        path: 'recycle-list/todo-components/footer.jsx'
      }]).then(code => {
        const id = String(Date.now() * Math.random())
        const instance = createInstance(id, code)
        setTimeout(() => {
          const target = readObject('recycle-list/todo-components/stateless-multi-todo-components.vdom.js')
          expect(getRoot(instance)).toEqual(target)
          instance.$destroy()
          done()
        }, 50)
      }).catch(done.fail)
    })

    it('stateful component', done => {
      const tasks = []
      addTaskHook((_, task) => tasks.push(task))
      compileWithDeps('recycle-list/todo-components/stateful.vue', [{
        name: 'counter',
        path: 'recycle-list/todo-components/counter.vue'
      }]).then(code => {
        const id = String(Date.now() * Math.random())
        const instance = createInstance(id, code)
        // expect(tasks.length).toEqual(3)
        setTimeout(() => {
          // check the render results
          const target = readObject('recycle-list/todo-components/stateful.vdom.js')
          expect(getRoot(instance)).toEqual(target)
          tasks.length = 0

          // // trigger component hooks
          // instance.$triggerHook(
          //   2, // cid of the virtual component template
          //   'create', // lifecycle hook name

          //   // arguments for the callback
          //   [
          //     'x-1', // componentId of the virtual component
          //     { start: 3 } // propsData of the virtual component
          //   ]
          // )
          // instance.$triggerHook(2, 'create', ['x-2', { start: 11 }])

          // // the state (_data) of the virtual component should be sent to native
          // expect(tasks.length).toEqual(2)
          // expect(tasks[0].method).toEqual('updateComponentData')
          // expect(tasks[0].args).toEqual(['x-1', { count: 6 }, ''])
          // expect(tasks[1].method).toEqual('updateComponentData')
          // expect(tasks[1].args).toEqual(['x-2', { count: 22 }, ''])

          // instance.$triggerHook('x-1', 'attach')
          // instance.$triggerHook('x-2', 'attach')
          // tasks.length = 0

          // // simulate a click event
          // // the event will be caught by the virtual component template and
          // // should be dispatched to virtual component according to the componentId
          // const event = getEvents(instance)[0]
          // fireEvent(instance, event.ref, 'click', { componentId: 'x-1' })
          setTimeout(() => {
            // expect(tasks.length).toEqual(1)
            // expect(tasks[0].method).toEqual('updateComponentData')
            // expect(tasks[0].args).toEqual([{ count: 7 }])
            instance.$destroy()
            resetTaskHook()
            done()
          })
        }, 50)
      }).catch(done.fail)
    })

    // it('component lifecycle', done => {
    //   global.__lifecycles = []
    //   compileWithDeps('recycle-list/todo-components/stateful-lifecycle.vue', [{
    //     name: 'lifecycle',
    //     path: 'recycle-list/todo-components/lifecycle.vue'
    //   }]).then(code => {
    //     const id = String(Date.now() * Math.random())
    //     const instance = createInstance(id, code)
    //     setTimeout(() => {
    //       const target = readObject('recycle-list/todo-components/stateful-lifecycle.vdom.js')
    //       expect(getRoot(instance)).toEqual(target)

    //       instance.$triggerHook(2, 'create', ['y-1'])
    //       instance.$triggerHook('y-1', 'attach')
    //       instance.$triggerHook('y-1', 'detach')
    //       expect(global.__lifecycles).toEqual([
    //         'beforeCreate undefined',
    //         'created 0',
    //         'beforeMount 1',
    //         'mounted 1',
    //         'beforeUpdate 2',
    //         'updated 2',
    //         'beforeDestroy 2',
    //         'destroyed 2'
    //       ])

    //       delete global.__lifecycles
    //       instance.$destroy()
    //       done()
    //     }, 50)
    //   }).catch(done.fail)
    // })

    it('stateful component with v-model', done => {
      compileWithDeps('recycle-list/todo-components/stateful-v-model.vue', [{
        name: 'editor',
        path: 'recycle-list/todo-components/editor.vue'
      }]).then(code => {
        const id = String(Date.now() * Math.random())
        const instance = createInstance(id, code)
        setTimeout(() => {
          const target = readObject('recycle-list/todo-components/stateful-v-model.vdom.js')
          expect(getRoot(instance)).toEqual(target)
          instance.$destroy()
          done()
        }, 50)
      }).catch(done.fail)
    })
  })
})
