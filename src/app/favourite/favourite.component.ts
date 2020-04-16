import { Component, OnInit, Input,Output,EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  // styleUrls: ['./favourite.component.css'],  
  styles: [
    `
      .mycolor{
        background:blue;
        color:red;
      }
      
    `
  ],
  encapsulation:ViewEncapsulation.Emulated //enables shadowdom
  // inputs: ["isFavourite"]
})
export class FavouriteComponent implements OnInit {
  @Input("is-Fav") isFavourite:boolean;
  @Output('change') click= new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  onClick(){
    // this.isFavourite=!this.isFavourite;
    this.click.emit({'option': this.isFavourite});
  }



  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }
  

}

export interface favChangeEventargs{
  optionvalue:boolean;
}