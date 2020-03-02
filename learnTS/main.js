"use strict";
exports.__esModule = true;
var point_1 = require("./point");
function mymethod(msg) {
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }
    console.log('finally' + i);
}
function mymethod1() {
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }
    // console.log('finally' + i);
}
mymethod('s');
mymethod1();
var color;
(function (color) {
    color[color["red"] = 0] = "red";
    color[color["greeen"] = 1] = "greeen";
    color[color["blue"] = 2] = "blue";
})(color || (color = {}));
console.log(color.blue);
// Type assertions
var msg = "sridhar kidambi";
var newmsg = msg.endsWith('i');
// arrow functions
var mymethoodarrow = function (msg) {
    console.log(msg);
};
mymethoodarrow('Arrowpostle');
// interface Point{
//     x:number,
//     y:number
// }
// class Pointc implements Point{
//     x:number;
//     y:number;
//     private z:number
//     getZ(){
//         return this.z;
//     }
//     setZ(val:number){
//         this.z=val;
//     }
//     constructor (x: number,y?:number){
//         this.x=x;
//         this.y=y;
//         this.z=100;
//     }
//     selfmethod(){
//         console.log("Selfmethod");
//     }
// }
var drawpoint = function (point) {
    console.log(point.x);
};
var _Point = new point_1.Pointc(5, 4);
// _Point.x=7
// _Point.y=10
_Point.setZ(99);
_Point.y = 11;
console.log('print it');
console.log(_Point.getZ());
_Point.selfmethod();
drawpoint(_Point);
