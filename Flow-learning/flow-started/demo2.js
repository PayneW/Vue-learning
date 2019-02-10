// flow

const _ = require("./third-plugin/underscore");


var pizzas = [
    { title: 'Margherita', vegetarian: true },
    { title: 'Pepperoni', vegetarian: false },
    { title: 'Four cheese', vegetarian: true },
    { title: 'Hawaiian', vegetarian: false },
];

function vegetarianPizzas() {
    // .findWhere() 找到第一个 vegetarian 为 true 的 选项
    return _.findWhere(pizzas, {vegetarian: true});
}

console.log(vegetarianPizzas());