import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleRoutingModule } from './sample-routing.module';
import {SharedModule} from "../../shared/shared.module";

import { SampleComponent } from "./sample.component";
import { SampleBasicInfoComponent } from './sample-basic-info/sample-basic-info.component';
import { EnhancerDistributionComponent } from './enhancer-distribution/enhancer-distribution.component';
import { TypicalEnhancerComponent } from './typical-enhancer/typical-enhancer.component';
import { SuperEnhancerComponent } from './super-enhancer/super-enhancer.component';
import { TFComponent } from './tf/tf.component';

@NgModule({
  declarations: [SampleComponent, SampleBasicInfoComponent, EnhancerDistributionComponent, TypicalEnhancerComponent, SuperEnhancerComponent, TFComponent],
  imports: [
    CommonModule,
    SampleRoutingModule,
    SharedModule
  ]
})
export class SampleModule { }
