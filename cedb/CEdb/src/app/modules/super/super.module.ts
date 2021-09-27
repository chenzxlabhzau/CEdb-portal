import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperRoutingModule } from './super-routing.module';
import {SharedModule} from "../../shared/shared.module";

import {SuperComponent} from "./super.component";
import { SuperGeneComponent } from './super-gene/super-gene.component';
import { SuperResultComponent } from './super-result/super-result.component';
import { SuperRegionComponent } from './super-region/super-region.component';

@NgModule({
  declarations: [SuperComponent, SuperGeneComponent, SuperResultComponent, SuperRegionComponent],
  imports: [
    CommonModule,
    SuperRoutingModule,
    SharedModule
  ]
})
export class SuperModule { }
