import { Component } from '@angular/core'
import { templateJitUrl } from '@angular/compiler';
import { CoursesService } from './courses.service';

@Component({
    selector: 'courses' ,
    templateUrl: './courses.component.html',
    styleUrls:['./courses.component.css']
})
export class CoursesComponent{
    title="Products";
    courses:any;
    _courseService:CoursesService;
    imageurl="https://i.stack.imgur.com/MVhla.jpg"

    getTitile(){
        return this.title;
    }

    constructor(service:CoursesService){
        this.courses = service.getCourses();
    }

    getProducts(){
        return this.courses;
    }

}