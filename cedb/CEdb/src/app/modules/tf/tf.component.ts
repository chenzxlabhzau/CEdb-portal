import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CancerApiService } from 'src/app/shared/cancer-api.service';

import { Router } from '@angular/router';
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {fromEvent, merge} from "rxjs";

@Component({
  selector: 'app-tf',
  templateUrl: './tf.component.html',
  styleUrls: ['./tf.component.css']
})
export class TFComponent implements OnInit, AfterViewInit {
  cancer:string;
  source:string;
  selected_cancer:string;
  // selected_source:string;
  query:string;
  Cancers: string[];
  isLegalInput = true;
  constructor(private router: Router, private CancerApiService: CancerApiService) { }
  @ViewChild('input') input: ElementRef;
  ngOnInit(): void {
    // this.Sources = ["Primary tissue","Cell line"];
    this.CancerApiService.ListCancers("").subscribe((res: any) => {
      this.Cancers = res
    })
  }
ngAfterViewInit(): void {
    // @ts-ignore
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.query=this.input.nativeElement.value
        })
      )
      .subscribe();
  }

  public selectcancer(event:any): void {
    this.selected_cancer = this.cancer
  }


}
