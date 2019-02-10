/** from 2017/2/23.
 * 学习prototype,jquery这些库中封装函数的写法。记录原型，继承，组合继承，这些语法的具体用法。
 * [6.3.3：组合继承(combination inheritance):有时候也叫做伪经典继承，指的是将“原型链”和“借用构造函数”的技术组合到一起，
 * 从而发挥二者之长的一种继承模式。其背后的思路是使用原型链实现对原型函数和方法的继承，而通过借用构造函数来实现对实例属性的继承。
 * 这样，即通过在原型上定义方法实现了函数复用，又能够保证每个实例都有他自己的属性。--《javascript高级程序设计》]
 */

// js高程 "6.2.3 原型模式 " --- start
//   原型模式的[特点/缺点]: 原型上包含的属性和方法是对所有实例共享的

function People(){
}
People.prototype.name = "Nicholas";
People.prototype.age = 29;
People.prototype.job = "Software Engineer";
People.prototype.sayName = function(){
    console.log(this.name);
};
var people1 = new People();
people1.sayName();      // Nicholas
var people2 = new People();
people2.sayName();      // Nicholas

// js高程 "6.2.3 原型模式 " --- over


/** Vue.component()组件方法中data必须是一个函数的讲解？ */
function Component(){}
Component.prototype.data = {
    a: 1,
    b: 2
};
var component1 = new Component();
var component2 = new Component();
console.log(component1.data.a === component2.data.a);   // true

// 因为所有实例共享原型的属性和方法，所以一个实例上的值发生改变，另外一个实例的值也会随着变更。这种问题的解决方法在js
// 面向对象中是给了 "组合使用构造函数模式和原型模式[详见下面Person]" 来解决的。Vue中也是利用这种解决方法，但是和
// 书上给出的示例还不太一样，下面是Vue给出的解决方法(原理讲解，非源码)。
function VueComponent(){
    this.data = this.data();
}
VueComponent.prototype.data = function(){
    return {
        a: 1, b: 2
    }
};
var vueComp1 = new VueComponent();
vueComp1.data.a =  111111;
console.log(vueComp1.data.a);   // 111111

var vueComp2 = new VueComponent();
console.log(vueComp2.data.a);   // 1
console.log(vueComp2.data.b);   // 2






/*------js高程 "6.2.4 组合使用构造函数模式和原型模式"*/
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelly", "Court"];
}
Person.prototype = {
    constructor: Person,
    sayName: function(){
        console.log(this.name);
    }
};
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
person1.friends.push("Van");
console.log(person1.friends);   //[ 'Shelly', 'Court', 'Van' ]
console.log(person2.friends);   //[ 'Shelly', 'Court' ]



/*------js高级 "6.3.3 组合继承" 示例， P168--------*/
function FatherFun(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

FatherFun.prototype.sayName = function () {
    console.log(this.name);  // Father function name
};
FatherFun.prototype.outputColors = function () {
    console.log(this.colors);  // ["red", "blue", "green"]
};
//-------正常在原型上添加方法的写法-------

var fatherFunIns = new FatherFun("Father function name"); //instance 实例
fatherFunIns.sayName();
fatherFunIns.outputColors();


function SonFun(name, age) {
    //继承FatherFun构造函数的属性
    FatherFun.call(this, name);
    this.age = age;
}
//继承FatherFun构造函数原型上的方法
SonFun.prototype = new FatherFun(); // 调用FatherFun构造函数,赋值给SonFun构造函数的原型(SonFun.prototype)
SonFun.prototype.constructor = SonFun;  //SonFun构造函数的constructor属性还指向SonFun
SonFun.prototype.sayAge = function () {
    console.log(this.age);
};
var sonFunIns1 = new SonFun("Nicholas", 29); //创建SonFun构造函数的实例，
sonFunIns1.colors.push("black");
console.log(sonFunIns1.colors);  // ["red", "blue", "green", "black"]
sonFunIns1.sayName();      // Nicholas
sonFunIns1.sayAge();       // 29

var sonFunIns2 = new SonFun("Greg", 27);
console.log(sonFunIns2.colors);  //["red", "blue", "green"]
sonFunIns2.sayName();    //Greg
sonFunIns2.sayAge();    //27

console.log("---------------------------------------------------------");

/*------js高级 "6.3.3 组合继承" 示例， P168 -- over --------*/



/**prototype中面向对象的写法大致是这样写的 : 每个函数都包含两个非继承而来的方法: apply()和call(). 这两个方法的用途
 * 都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。首先，apply()方法接受两个参数：(1)一个是在其中
 * 运行函数的作用域，(2)另一个是参数数组。其中第二个参数可以是Array的实例，也可以是arguments对象。
 * **/
function NativeTabSwitch() {
    this.initialize.apply(this, arguments);
}

NativeTabSwitch.prototype = {
    initialize: function (myName, myAge) {
        this.myName = myName;
        this.myAge = myAge;
    },
    consoleName: function(){
        console.log(this.myName);
    },
    consoleAge: function(){
        console.log(this.myAge);
    }
};

var myName = "My name is Nicholas.";
var myAge = "My age is 32 years old.";
var nativeTabSwiIns = new NativeTabSwitch(myName, myAge);
nativeTabSwiIns.consoleName();
nativeTabSwiIns.consoleAge();
/**prototype中面向对象的写法大致是这样写的**/


console.log("---------------------------------------------------------");


/**jQuery中面向对象的写法是这样写的**/
function jQuery() {
    return new jQuery.prototype.init(myName, myAge);
}

jQuery.prototype = {
    constructor: jQuery,
    init: function (myName, myAge) {
        this.myName = myName;
        this.myAge = myAge;
    },
    consoleName: function(para1){  //parameter 参数
        console.log(this.myName + para1);
    },
    consoleAge: function(para2){
        console.log(this.myAge + para2);
    }
};

jQuery.prototype.init.prototype = jQuery.prototype;
var para1 = "Do you know?";
var para2 = "People over thirty years old";

jQuery(myName).consoleName(para1);
jQuery(myAge).consoleAge(para2);
/**jQuery中面向对象的写法是这样写的**/
