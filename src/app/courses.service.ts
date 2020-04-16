import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  _httpService: HttpClient;
  covid_data:any;
  
  constructor(private httpService: HttpClient) { 
    this._httpService=httpService;

  }

  getCourses(){
    return ["Product1","Product2"];
  }

  getCovidDataSer(dte:string){

  //  return this._httpService.get('https://raw.githubusercontent.com/sridharkidambi/Gl-AIML/master/learnings/district_wise_pan_india2020-04-15.json');
   return this._httpService.get('https://raw.githubusercontent.com/sridharkidambi/Gl-AIML/master/learnings/district_wise_pan_india'+dte+ '.json');
}

   square = () => { 
    this._httpService.get('https://raw.githubusercontent.com/sridharkidambi/Gl-AIML/master/learnings/district_wise_pan_india2020-04-15.json').subscribe(
          data => {
            this.covid_data = data;	 // FILL THE ARRAY WITH DATA.
            //  return this.covid_data;
          },
          (err: HttpErrorResponse) => {
            console.log (err.message);
          }
        ); 
}; 
}
