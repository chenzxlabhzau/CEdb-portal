import {Component, Input, OnInit} from '@angular/core';
import { EChartsOption } from 'echarts';
import { SampleApiService} from "../sample-api.service";


@Component({
  selector: 'app-enhancer-distribution',
  templateUrl: './enhancer-distribution.component.html',
  styleUrls: ['./enhancer-distribution.component.css']
})
export class EnhancerDistributionComponent implements OnInit {
  @Input() sample_id:string;
  TypicalEnhancer:EChartsOption;
  SuperEnhancer:EChartsOption;
  constructor(private sampleApiService:SampleApiService) {

  }
  enhancer = 'The distribution of Typical Enhancer';
  super_enhancer = 'The distribution of Super Enhancer';


  ngOnInit(): void {
    this.sampleApiService.PieTypical(this.sample_id).subscribe((res) => {
      this.TypicalEnhancer = this._pieChart(res, this.enhancer);
    });
    this.sampleApiService.PieSuper(this.sample_id).subscribe((res) => {
      this.SuperEnhancer = this._pieChart(res, this.super_enhancer);
    });
  }

  private _pieChart(d:any,title:string): EChartsOption {
    return {
      tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : ({d}%)',
    },
      series: [
      {
        name: title,
        type: 'pie',
        radius: '90%',
        data: d.map((v) => ({ name: v.chr, value: v.value })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
    }
  }
}
