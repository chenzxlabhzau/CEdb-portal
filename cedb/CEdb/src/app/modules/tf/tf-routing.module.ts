import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TFComponent } from "./tf.component";

const routes: Routes = [
  {
    path: '',
    component: TFComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TFRoutingModule { }
