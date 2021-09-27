import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "../../shared/shared.module";
import { EnhancerRoutingModule } from './enhancer-routing.module';

import { EnhancerComponent } from './enhancer.component';
import { EnhancerInfoComponent } from './enhancer-info/enhancer-info.component';
import { EnhancerEqtlComponent } from './enhancer-eqtl/enhancer-eqtl.component';



@NgModule({
  declarations: [ EnhancerComponent, EnhancerInfoComponent, EnhancerEqtlComponent ],
  imports: [
    CommonModule,
    EnhancerRoutingModule,
    SharedModule
  ]
})
export class EnhancerModule { }
