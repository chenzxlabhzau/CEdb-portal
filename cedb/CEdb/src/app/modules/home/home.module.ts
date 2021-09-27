import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { DataSumComponent } from './data-sum/data-sum/data-sum.component';


@NgModule({
  declarations: [HomeComponent, DataSumComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
