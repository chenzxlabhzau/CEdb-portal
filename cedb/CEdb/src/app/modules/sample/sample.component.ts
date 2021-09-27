import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SampleApiService } from './sample-api.service'
import { SampleBasicInfo } from 'src/app/shared/model/sample-basic-info';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  sample_id:string;
  sampleBasicInfo:SampleBasicInfo;
  enhancerType = [
    {"show":"typical enhancer","value":"typical"},
    {"show":"super enhancer","value":"super"}
  ]

  constructor(private route: ActivatedRoute, private sampleApiService: SampleApiService) {

    this.route.params.subscribe((params) => {
      this.sample_id = params.sample_id;
  });
    this.sampleApiService.findSampleBasicInfo(this.sample_id).subscribe((res) => {
      this.sampleBasicInfo = res
    });
  }


  ngOnInit(): void {
  }

}
