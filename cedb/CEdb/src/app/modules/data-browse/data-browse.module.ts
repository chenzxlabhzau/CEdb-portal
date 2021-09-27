import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "../../shared/shared.module";
import { DataBrowseRoutingModule } from './data-browse-routing.module';

import { DataBrowseComponent } from './data-browse.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { DataTableComponent } from './data-table/data-table.component';


@NgModule({
  declarations: [
    DataBrowseComponent,
    SidePanelComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    DataBrowseRoutingModule,
    SharedModule
  ]
})
export class DataBrowseModule { }
