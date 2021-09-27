import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DataBrowseComponent} from "./data-browse.component";

const routes: Routes = [
  {
    path: '',
    component: DataBrowseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataBrowseRoutingModule { }
