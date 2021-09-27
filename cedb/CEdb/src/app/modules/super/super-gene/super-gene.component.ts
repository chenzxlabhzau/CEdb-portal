import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import {  tap } from 'rxjs/operators';
import { CancerApiService } from 'src/app/shared/cancer-api.service';


import { Router } from '@angular/router';

@Component({
  selector: 'app-super-gene',
  templateUrl: './super-gene.component.html',
  styleUrls: ['./super-gene.component.css']
})
export class SuperGeneComponent implements OnInit {
  @Output() genesearch = new EventEmitter<any>();


  cancer:string;
  source:string;
  constructor(private router: Router, private CancerApiService: CancerApiService) { }
  Cancers: string[];
  Sources: string[];
  isLegalInput = true;
  hasRequest = false;
  searchFormControl = new FormControl();
  ngOnInit(): void {
    this.Sources = ["Primary tissue","Cell line"];
    this.CancerApiService.ListCancers("").subscribe((res:any) => {
      this.Cancers = res
    })
    this.searchFormControl.valueChanges.pipe(tap((val) => {
        // http is requesting, isLoading true
        this.isLegalInput = this._checkInput(val);
        this.hasRequest = false;
      })).subscribe()
  }


  public search(): void {
    this.genesearch.emit({
      query:this.searchFormControl.value,
      cancer:this.cancer,
      source:this.source
    });

  }
  public selectsource(event:any): void {

    this.CancerApiService.ListCancers(event.value).subscribe((res:any) => {
      this.Cancers = res
    })
  }

  private _checkInput(s: string): boolean {
    const regex = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/g;
    return !regex.test(s);

  }
}
