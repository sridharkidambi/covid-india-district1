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
import { DatePipe } from '@angular/common';
import { filter } from 'minimatch';
import { MultiDataSet, Label } from 'ng2-charts';



@Component({
    selector: 'courses' ,
    templateUrl: './courses.component.html',
    styleUrls:['./courses.component.css'],
    
})
export class CoursesComponent implements OnInit{
    title="Products";
    // public selectedItem: any;
    // public selectedDistrictItem:any;
    count:number=0;
    pieData:MultiDataSet=[];
    pieStateDist: Label[]=[];
    covid_data:any;
    covid_data_filtered:any;
    itemchartData:ChartData;
    chartDatalst:chartDataList;
    isGraphVisible:boolean=false;
    districtChartDatalst:chartDataList;
    districtPercentRaiseChartDatalst:chartDataList;
    districtPercentRaiseSelectedDstChartDatalst:chartDataList;
    state_covid_data=[];
    selected_state:string="undefined"; 
    selected_District:string="undefined";
    _httpService: HttpClient;
    _service:CoursesService;
    courses:any;
    disableDistrict:boolean=true;
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
    yesterdayDate:any;
    raw_resp:any;

 
    chartData1=[];
    
      chartLabels = ['11-04-2020', '12-04-2020', '13-04-2020', '14-04-2020'];
      chartLabels1=[];
    
      onChartClick(event) {
        console.log(event);
      }

    constructor(service:CoursesService,public datepipe: DatePipe){
        this._service=service;
        this.courses = service.getCourses();
        
    }

    getCovidData()
    {

      this.yesterdayDate=new Date();
      this.yesterdayDate.setDate(this.yesterdayDate.getDate() - 1);
      // console.log(this.yesterdayDate);
      if(this.covid_data == null){
      this._service.getCovidDataSer(this.datepipe.transform(this.yesterdayDate, 'yyyy-MM-dd')
      ).subscribe(resp => {
        this.raw_resp=resp;
        this.covid_data = this.raw_resp.data;

        this.processStateWiseRecords();
        this.loadStates();

      },
        error => {
          console.log(error, "error");
        });
      }

    }

    loadStates(){
      this.covid_data.forEach(element => {
       if(!this.states.includes(element[1])){
        this.states.push(element[1]);
        }
      });
      // console.log('i am SK states');
      this.states=this.states.sort(function(a, b) { 

        if(b>a)  return -1;
        if(a>b)  return +1;

       return 0;
      });
      console.log(this.states);
    }

    processStateWiseRecords(){
      // var _rawdata = new rawdata();
      this.chartDatalst=new chartDataList();
      this.districtPercentRaiseChartDatalst=new chartDataList();
      this.districtPercentRaiseSelectedDstChartDatalst=new chartDataList();
      this.districts =[];
      this.dates=[];
      this.chartData1=[];
      // console.log("this.covid_data");
      // console.log(this.selected_state);
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

      this.districtPercentRaiseChartDatalst.chartData.forEach(x=>{
        if(this.selected_District ==x.label){
          this.districtPercentRaiseSelectedDstChartDatalst.chartData.push(x);
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
      this.chartLabels1=[];
      this.dates.forEach(item=>{
        this.chartLabels1.push(item);
      });
      // Sort the data
      this.covid_data= this.covid_data.sort((a,b)=>{
        if(a[3]>b[3]) return -1;        
        if(b[3]>a[3]) return +1;        
        return 0;
      });
      this.covid_data_filtered= this.covid_data.filter(x=>{
        if(x[4]== this.datepipe.transform(this.yesterdayDate, 'yyyy-MM-dd'))
        return x;
      });
      console.log(this.covid_data_filtered)
      this.covid_data_filtered.forEach(element => {
        if(this.count<10){
          // console.log(element)
          this.pieData.push(element[3]);
          this.pieStateDist.push(element[1]+'-'+element[2]);
        }
        this.count=this.count+1;
      });
      console.log('piedata')
      console.log(this.pieData)
      console.log(this.pieStateDist)
        
      // }
      // count=0;
      // for(let item in this.covid_data_filtered){
      //   console.log(this.count);

      //   if(this.count<=10){
      //     console.log(this.covid_data_filtered[item]);
      //     console.log(this.covid_data_filtered[item]);
      //     this.count=this.count+1;
      //     return;
      //   }
      //   break;
      // }
  };

    ngOnInit() {
      this.getCovidData();
      

    }

    onDropDownChange() {
      // alert(this.selectedItem);
      this.disableDistrict=false;
    this.isGraphVisible=false;

    this.processStateWiseRecords();

  }
  onDropDownDistrictChange(){
    this.isGraphVisible=true;
    this.processStateWiseRecords();
    

  }

  getProducts(){
      return this.courses;
  }

    

}