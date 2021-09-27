import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
// import { DataSumApiService} from "./data-sum-api.service";
import summary from 'src/app/shared/constants/summary';

@Component({
  selector: 'app-data-sum',
  templateUrl: './data-sum.component.html',
  styleUrls: ['./data-sum.component.css']
})
export class DataSumComponent implements OnInit {
  statDist: EChartsOption;
  constructor(
    //private dataSumApiService:DataSumApiService
     ) { }
   private _statDist(d: any, title: string): EChartsOption {
    return {
      title: {
        show: false,
        text: title,
      },
      grid: {
        top: '8%',
        left: '10%',
        right: '2%',
        bottom: '40%',
      },
      toolbox: {
        showTitle: true,
        feature: {
          data: { show: false },
          saveAsImage: {
            title: 'Save as image',
          },
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      legend: {
        data: d.legend,
      },
      xAxis: {
        type: 'category',
        show: true,
        name: 'Conditions',
        nameGap: 70,
        nameTextStyle: { fontWeight: 'bolder' },
        axisTick: { show: false },
        axisLabel: { show: true, interval: 0, rotate: 45 },
        data: d.xAxis,
      },
      yAxis: {
        type: 'value',
        show: true,
        name: 'Number of samples',
        nameTextStyle: { fontWeight: 'bolder' },
        nameGap: 30,
      },
      series: [
        {
          name: d.legend[0],
          type: 'bar',
          stack: 'total',
          data: d.primary,
        },
        {
          name: d.legend[1],
          type: 'bar',
          stack: 'total',
          data: d.cell_line,
        },
      ],
    };
   }

  ngOnInit(): void {
      this.statDist = this._statDist(summary, "the summary of dataset");
  }


}
