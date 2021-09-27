import { Component, OnInit, Input } from '@angular/core';
import { SampleBasicInfo } from 'src/app/shared/model/sample-basic-info';

@Component({
  selector: 'app-sample-basic-info',
  templateUrl: './sample-basic-info.component.html',
  styleUrls: ['./sample-basic-info.component.css']
})
export class SampleBasicInfoComponent implements OnInit {
  @Input() sampleBasicInfo: SampleBasicInfo;
  constructor() { }
  ngOnInit(): void {
  }

}
