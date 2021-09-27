import { Component, OnInit, Input } from '@angular/core';
import { EnhancerApiService } from '../enhancer-api.service'
import { EnhancerBasicInfo } from "../../../shared/model/enhancer-basic-info";


@Component({
  selector: 'app-enhancer-info',
  templateUrl: './enhancer-info.component.html',
  styleUrls: ['./enhancer-info.component.css']
})
export class EnhancerInfoComponent implements OnInit {
  @Input() enhancer_id:string
  enhancerBasicInfo:EnhancerBasicInfo;
  constructor(private enhancerApiService:EnhancerApiService) { }

  ngOnInit(): void {
    this.enhancerApiService.findSuperEnhancerBasicInfo(this.enhancer_id).subscribe((res) => {
      this.enhancerBasicInfo = res
    });
  }

}
