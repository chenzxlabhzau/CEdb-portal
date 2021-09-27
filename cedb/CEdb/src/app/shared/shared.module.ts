import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EchartsModule } from './echarts.module';
import { SafeHtml } from './pipes/SVGTrans';


@NgModule({
  declarations: [
    HeaderComponent,SafeHtml,FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    EchartsModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    EchartsModule,
    SafeHtml,
    FooterComponent
  ],
})
export class SharedModule {}
