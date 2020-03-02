 
interface Point{
    x:number,
    y:number
}
export class Pointc implements Point{
    x:number;
    y:number;
    private z:number

    getZ(){
        return this.z;
    }
    setZ(val:number){
        this.z=val;
    }

    constructor (x: number,y?:number){
        this.x=x;
        this.y=y;
        this.z=100;
    }

    selfmethod(){
        console.log("Selfmethod");
    }
}