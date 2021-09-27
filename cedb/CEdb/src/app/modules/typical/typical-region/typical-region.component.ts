import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CancerApiService } from 'src/app/shared/cancer-api.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-typical-region',
  templateUrl: './typical-region.component.html',
  styleUrls: ['./typical-region.component.css']
})
export class TypicalRegionComponent implements OnInit {
  @Output() regionsearch = new EventEmitter<any>();

  cancer:string;
  source:string;
  chr:string;
  constructor(private router: Router, private CancerApiService: CancerApiService) { }
  Cancers: string[];
  Sources: string[];
  startFormControl = new FormControl();
  endFormControl = new FormControl();

  ngOnInit(): void {
    this.Sources = ["Primary tissue","Cell line"];
    this.CancerApiService.ListCancers("").subscribe((res:any) => {
      this.Cancers = res
    })
  }
  public search(): void {
    if (this.cancer==undefined){
      alert("the cancer type must be selected")
      return
    }
    console.log(this.cancer)
    this.regionsearch.emit({
      chr:this.chr,
      start:this.startFormControl.value,
      end:this.endFormControl.value,
      cancer:this.cancer,
      source:this.source
    });

  }
  chrs: string[] = ["chr1","chr2","chr3","chr4","chr5","chr6","chr7",
    "chr8","chr9","chr10","chr11","chr12","chr13","chr14","chr15","chr16","chr17",
    "chr18","chr19","chr20","chr21","chr22","chrX","chrY"
  ];

  public selectsource(event:any): void {

    this.CancerApiService.ListCancers(event.value).subscribe((res:any) => {
      this.Cancers = res
    })
  }
}
