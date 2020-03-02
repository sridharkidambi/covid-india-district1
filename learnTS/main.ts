import {Pointc} from './point'
function mymethod(msg) {
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }
    console.log('finally' + i);
}
function mymethod1() {
    for (let i = 0; i < 5; i++) {
        console.log(i);
    }
    // console.log('finally' + i);
}
mymethod('s');
mymethod1();
enum color {red,greeen,blue}
console.log(color.blue)
// Type assertions
let msg="sridhar kidambi"
let newmsg = (<string>msg).endsWith('i')

// arrow functions
let mymethoodarrow =(msg)=>{
    console.log(msg)
}

mymethoodarrow('Arrowpostle')

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
let drawpoint =(point:Point)=>{
    console.log(point.x)
}
let _Point= new Pointc(5,4)
// _Point.x=7
// _Point.y=10
_Point.setZ(99);
_Point.y=11;
console.log('print it')
console.log(_Point.getZ())

_Point.selfmethod();

drawpoint(_Point)