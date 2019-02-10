
let imgUrl = "./src/images/rabbit-big.png";
//
let positions = ["0 -852", "-174 -852", "-349 -852", "-524 -852",
    "-698 -852", "-873 -848"];

let ele = document.getElementById("rabbit");

animation(ele, positions, imgUrl);

function animation(ele, positions, imgUrl) {

    ele.style.backgroundImage = "url(" + imgUrl + ")";
    ele.style.backgroundRepeat = "no-repeat";

    let index = 0;

    function run() {

        // 每帧的位置
        let position = positions[index].split(" ");
        // 拼接字符串 "px " 后有一个空格，一定要注意啊 (例如: background-position: 100px 200px)
        ele.style.backgroundPosition = position[0] + "px " + position[1] + "px";
        index++;

        console.log(index);
        console.log("positions.length: " , positions.length);

        if (index >= positions.length) {
            index = 0;
        }

        // 动画的实现方式是通过每隔固定的毫秒数(例如 80ms)执行一个预定的动作(函数)，但问题是
        // setTimeout()间隔 80ms 执行一次浏览器并不会百分百按照这个时间执行，也就是说浏览器
        // 执行的时间不准确，而且随着 setTimeout 的不断执行误差可能会越来越大(就是说执行时间
        // 会大于 80ms 很多才，比如 100ms/120ms/180ms 才会执行)，这样动画就会变的越来越
        // 不连贯。我们回过头来想想什么是动画: 动画就是动画开始到某一个时间点执行完毕，这个动画
        // 执行了多长时间，在这个时间点动画是一个什么状态并绘制出来，整个动画应该是一串流畅的
        // 动作，即使当前浏览器的执行环境不好，我们还是能保证当前动画匀速流畅的运行完毕。
        //    根据这个需求我们设计一个时间轴的类 (Timeline), 这个时间轴的作用就是管理回调
        // 函数按照预期的动作来执行；给这个时间轴的类(构造函数)传入一个"回调函数"，在这个回调
        // 函数中拿到当前动画已经运行了多久，这样就可以把帧动画给绘制出来，来达到帧动画的目的。
        setTimeout(run, 80);
    }

    run()

}
