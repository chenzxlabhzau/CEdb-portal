import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  cancer_type:string[]=["BC"];
  tissue_type:string[]=[];
  peak_type:string[]=[];
  constructor() { }

  ngOnInit(): void {
  }

  public cancerselect($event: any){
    this.cancer_type=$event
  }
  public tissueselect($event: any){
    this.tissue_type=$event
  }
  public peakselect($event: any){
    this.peak_type=$event
  }

}
