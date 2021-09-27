import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnhancerComponent } from "./enhancer.component";

const routes: Routes = [
  {
    path: ':enhancer_id',
    component: EnhancerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnhancerRoutingModule { }
