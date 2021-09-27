import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typical',
  templateUrl: './typical.component.html',
  styleUrls: ['./typical.component.css']
})
export class TypicalComponent implements OnInit {
  query:string;
  cancer:string;
  source:string;
  chr:string;
  start:number;
  end:number;
  constructor() { }
  showtable=false

  ngOnInit(): void {
  }
  public changegene(item:any): void {

    this.showtable = true
    this.cancer = item.cancer;
    this.source = item.source;
    this.query = item.query;
    this.chr = undefined;
    this.start=null;
    this.end=null;
  }
    public changeregion(item:any): void {
    this.showtable = true
    this.query = undefined;
    this.cancer = item.cancer;
    this.source = item.source;
    this.chr = item.chr;
    this.start=item.start;
    this.end=item.end;
  }
}
