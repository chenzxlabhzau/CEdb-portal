import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TypicalComponent} from "./typical.component";

const routes: Routes = [
  {
    path: '',
    component: TypicalComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypicalRoutingModule { }
