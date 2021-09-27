import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-browse',
  templateUrl: './data-browse.component.html',
  styleUrls: ['./data-browse.component.css']
})
export class DataBrowseComponent implements OnInit {
  cancer_type:string[]=[];
  tissue_type:string[]=[];
  constructor() {
  }

  ngOnInit(): void {
  }

  public cancerselect($event: any){
    this.cancer_type=$event
  }
  public tissueselect($event: any){
    this.tissue_type=$event
  }
}
