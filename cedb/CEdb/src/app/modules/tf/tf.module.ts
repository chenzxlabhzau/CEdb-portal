import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TFRoutingModule } from './tf-routing.module';
import {SharedModule} from "../../shared/shared.module";

import { TFComponent } from "./tf.component";
import { TfTableComponent } from './tf-table/tf-table.component';

@NgModule({
  declarations: [TFComponent, TfTableComponent],
  imports: [
    CommonModule,
    TFRoutingModule,
    SharedModule
  ]
})
export class TFModule { }
