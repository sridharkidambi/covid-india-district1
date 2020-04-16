import { rawdata } from './rawdata';
import { chartDataList } from './ChartDataList';
import { ChartData } from './ChartData';
import { Component, OnInit } from '@angular/core'
import { templateJitUrl } from '@angular/compiler';
import { CoursesService } from './courses.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import {plainToClass} from "class-transformer";


@Component({
    selector: 'courses' ,
    templateUrl: './courses.component.html',
    styleUrls:['./courses.component.css'],
    
})
export class CoursesComponent implements OnInit{
    title="Products";
    covid_data:any;
    itemchartData:ChartData;
    chartDatalst:chartDataList;
    districtChartDatalst:chartDataList;
    districtPercentRaiseChartDatalst:chartDataList;
    state_covid_data=[];
    selected_state:string="Tamil Nadu";
    selected_District:string="Chennai";
    _httpService: HttpClient;
    _service:CoursesService;
    courses:any;
    _courseService:CoursesService;
    imageurl="https://i.stack.imgur.com/MVhla.jpg"
    corona_imageurl="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXsTbPGYb1Tz7kw3cO-lhMRHv4BYgIhWRxZAwrM-h--VAARVsx&usqp=CAU"
    india_imageurl="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkwLkmJBZuIl8OsSAYMpy3S0T3_tRBkm3R5fywqjA_hMNfkhBM&usqp=CAU"
    

    getTitile(){
        return this.title;
    }

    StateSelected($event){

    }

    chartOptions = {
        responsive: true,
        maintainAspectRatio: false
      };
    districts=[];
    states=[];
    dates=[];

 
    chartData1=[];
    
      chartLabels = ['11-04-2020', '12-04-2020', '13-04-2020', '14-04-2020'];
      chartLabels1=[];
    
      onChartClick(event) {
        console.log(event);
      }

    constructor(service:CoursesService){
        this._service=service;
        this.courses = service.getCourses();
        
    }

    getCovidData()
    {

      if(this.covid_data == null){
      this._service.getCovidDataSer().subscribe(resp => {
        this.covid_data = resp.data;
        this.processStateWiseRecords();
      },
        error => {
          console.log(error, "error");
        });
      }

    }


    processStateWiseRecords(){
      // var _rawdata = new rawdata();
      this.chartDatalst=new chartDataList();
      this.districtPercentRaiseChartDatalst=new chartDataList();
      // console.log(this.covid_data);
      this.covid_data.forEach(element => {
        if(this.selected_state == element[1]){
          this.state_covid_data.push(element);
          if(!(this.districts.includes( element[2]))){
            this.districts.push(element[2]);
            this.itemchartData=new ChartData();
            this.itemchartData.label=element[2];
            this.itemchartData.data.push(element[3])
            this.chartDatalst.chartData.push(this.itemchartData);
            // For percentage raise across districts
            this.itemchartData=new ChartData();
            this.itemchartData.label=element[2];
            this.itemchartData.data.push(element[6])
            this.districtPercentRaiseChartDatalst.chartData.push(this.itemchartData);
          }else{
          this.chartDatalst.chartData.find(x => x.label === element[2]).data.push(element[3]);
          this.districtPercentRaiseChartDatalst.chartData.find(x => x.label === element[2]).data.push(element[6]);
          }
        }
      });
      console.log(this.chartDatalst.chartData);
          // district wise data growth %
      // console.log(this.districtPercentRaiseChartDatalst.chartData);
      this.districtChartDatalst=new chartDataList()

      this.chartDatalst.chartData.forEach(x=>{
        if(this.selected_District ==x.label){
          this.districtChartDatalst.chartData.push(x);
        }
      });

      //   }
      // });

      this.chartDatalst.chartData.forEach(item=>{
        this.chartData1.push((item));
      });

      this.state_covid_data.forEach(item=>{
          if(!(this.dates.includes( item[4]))){
            this.dates.push(item[4]);
          }
      });
      this.dates.forEach(item=>{
        this.chartLabels1.push(item);
      });
    
  };

    ngOnInit() {
      this.getCovidData();
    }

    

  getProducts(){
      return this.courses;
  }

    

}