import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypicalRoutingModule } from './typical-routing.module';
import {SharedModule} from "../../shared/shared.module";

import {TypicalComponent} from "./typical.component";
import { TypicalGeneComponent } from './typical-gene/typical-gene.component';
import { TypicalResultComponent } from './typical-result/typical-result.component';
import { TypicalRegionComponent } from './typical-region/typical-region.component';

@NgModule({
  declarations: [TypicalComponent, TypicalGeneComponent, TypicalResultComponent, TypicalRegionComponent],
  imports: [
    CommonModule,
    TypicalRoutingModule,
    SharedModule
  ]
})
export class TypicalModule { }
