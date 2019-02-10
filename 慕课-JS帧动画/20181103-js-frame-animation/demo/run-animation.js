"use strict";

var animation = window.animation;

var $rabbit1 = $("rabbit1"),
    $rabbit2 = $("rabbit2"),
    $rabbit3 = $("rabbit3"),
    $rabbit4 = $("rabbit4");
var images = [
    "./images/rabbit-big.png",
    "./images/rabbit-lose.png",
    "./images/rabbit-win.png",
];

var rightRunningMap = ["0 -852", "-174 -852", "-349 -852", "-524 -852", "-698 -852", "-873 -848"];
var leftRunningMap = ["0 -373", "-175 -376", "-350 -377", "-524 -377", "-699 -377", "-873 -379"];
var rabbitWinMap = ["0 0", "-198 0", "-401 0", "-609 0", "-816 0", "0 -96", "-208 -97", "-415 -97", "-623 -97", "-831 -97", "0 -203", "-207 -203", "-415 -203", "-623 -203", "-831 -203", "0 -307", "-206 -307", "-414 -307", "-623 -307"];
var rabbitLoseMap = ["0 0", "-163 0", "-327 0", "-491 0", "-655 0", "-819 0", "0 -135", "-166 -135", "-333 -135", "-500 -135", "-668 -135", "-835 -135", "0 -262"];


repeat();

console.log(animation);

function repeat() {
    var repeatAnimation = animation().loadImage(images).changePosition($rabbit1, rightRunningMap, images[0]).repeatForever();
    console.log(repeatAnimation);
    repeatAnimation.start(80);

    var running = true;
     $rabbit1.addEventListener("click", function() {
         if (running) {
             running = false;
             repeatAnimation.pause();
         } else {
             running = true;
             repeatAnimation.restart();
         }
     })
}


function $(id){
    return document.getElementById(id);
}


