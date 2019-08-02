
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

// - 因为所有实例共享原型的属性和方法，所以一个实例上的值发生改变，另外一个实例的值也会随着
//   变更。这种问题的解决方法在js
// - 面向对象中是给了 "组合使用构造函数模式和原型模式[详见下面Person]" 来解决的。Vue中也
//   是利用这种解决方法，但是和书上给出的示例还不太一样，下面是Vue给出的解决方法(原理讲解，非源码)。
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
// 调用FatherFun构造函数,赋值给SonFun构造函数的原型(SonFun.prototype)
SonFun.prototype = new FatherFun();
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

