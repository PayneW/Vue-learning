## better-scroll

### 生词
- **momentum /mə'mentəm/ n. 动力，动量，** 
    + --> law of conservation of momentum 动量守恒定律
    + --> momentum equation  动量方程
    + --> momentum limit distance 动量限制距离
    
- **threshold /'θreʃəʊld/** n.阈，门槛; <喻>开始
    + --> absolute threshold 绝对阈(yu)值
    + --> He is on the threshold of success. 他即将成功。
    + --> direction lock threshold. 方向锁定阈值
- **flick /flɪk/** v.拂去，弹
    + --> flick limit time. 轻弹限制事件
    + --> flick limit distance 轻弹限制距离
- **probe /prəʊb/** v.探测，探讨
    + --> probe type 探测类型
- **tap /tæp/** n.龙头，轻打  v.敲击，敲打
    + --> Well, do you still drink tap water? 你现在还会喝自来水吗？
    + --> When you want a bath, just turn on the tap. 当你要洗澡时，打开水龙头。
    + --> Do what? Tap your ring like that. 做什么，敲你的戒指。
- **bounce /baʊns/** n.弹跳，跳跃  v.跳，乱跳
    + --> One,two,three. A ball bounced, uh-huh.  一、二、三。 一个球反弹了，嗯。
    + --> How can you bounce stuff off the moon? 你怎么可能从月球上弹射东西？ 

### ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### better-scroll 选项/基础

- better-scroll 支持很多参数配置，可以在初始化的时候传入第二个参数，比如:
    ```javascript
        let scroll = new BScroll(".wrapper", {
            scrollY: true,
            click: true,
        })
    ```

- new BScroll(ele, options) 详解 options 支持的参数
    ```javascript
        let scroll = new BScroll(".wrapper", {
            // 类型: Number. 作用: 横轴方向初始化位置。
            startX: 0,
            // 类型: Number. 作用: 纵轴方向初始化位置。
            startY: 0,
            // 类型: . 作用:
            scrollX: false,
            // 类型: . 作用:
            scrollY: true,
            // 类型: . 作用:
            freeScroll: false,
            // 类型: . 作用:
            directionLockThreshold: 5,
            // 类型: . 作用:
            eventPassthrough: "",
            // 类型: . 作用:
            click: false,
            // 类型: . 作用:
            dblClick: false,
            // 类型: . 作用:
            tap: false,
            // 类型: . 作用:
            bounce: true,
            bounceTime: 800,
            momentum: true,
            momentumLimitTime: 300,
            momentumLimitDistance: 15,
            swipeTime: 2500,
            swipeBounceTime: 500,
            deceleration: 0.0015,
            flickLimitTime: 200,
            flickLimitDistance: 100,
            resizePolling: 60,
            probeType: 0,
            preventDefault: true,
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },
            HWCompositing: true,
            //   
            useTransition: true,
            //   
            useTransform: true,
            // 
            bindToWrapper: false,
            // disableMouse: 根据当前浏览器环境计算而来(不建议修改)
            // disableTouch: 同上、
            // 会检测 scroller 内部 DOM 变化，自动调用 refresh 方法重新计算来保证滚动的正确性。
            observeDOM: true,
            // 
            autoBlur: true,
            // 是否阻止事件冒泡，多用在嵌套 scroll 的场景。
            stopPropagation: false,
        })
    ```