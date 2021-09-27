import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "../../shared/shared.module";
import { StatisticsRoutingModule } from './statistics-routing.module';

import { StatisticsComponent } from './statistics.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [
    StatisticsComponent,
    SidePanelComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModule
  ]
})
export class StatisticsModule { }
