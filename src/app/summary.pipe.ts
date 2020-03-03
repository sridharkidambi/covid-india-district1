import  {PipeTransform, Pipe}  from '@angular/core';


@Pipe({
    name: 'summary'
})
export class SummaryPipe implements PipeTransform{
    customvalue:number;

    transform(value:string ,args?:number){
        console.log("i am in custom pipe",value.substr(0,50) +'....');
        // this.customvalue =value.substr(0,50) +'....';

        this.customvalue =(args)? args:50;

        if(!value){
            return "text me";
        }
        return value.substr(0,this.customvalue) ;

    }
}