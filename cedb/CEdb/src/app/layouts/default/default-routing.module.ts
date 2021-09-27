import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      // dashboard routing
      {
        path: '',
        loadChildren: () => import('src/app/modules/home/home.module').then((m) => m.HomeModule),
      },
      // browse routing
      {
        path: 'browse',
        loadChildren: () => import('src/app/modules/data-browse/data-browse.module').then((m) => m.DataBrowseModule),
      },
      // // super
      {
        path: 'super',
        loadChildren: () => import('src/app/modules/super/super.module').then((m) => m.SuperModule),
      },
      {
        path: 'typical',
        loadChildren: () => import('src/app/modules/typical/typical.module').then((m) => m.TypicalModule),
      },
      {
        path: 'tf',
        loadChildren: () => import('src/app/modules/tf/tf.module').then((m) => m.TFModule),
      },
      {
        path: 'statistics',
        loadChildren: () => import('src/app/modules/statistics/statistics.module').then((m) => m.StatisticsModule),
      },
      {
        path: 'download',
        loadChildren: () => import('src/app/modules/download/download.module').then((m) => m.DownloadModule),
      },
      {
        path: 'sample',
        loadChildren: () => import('src/app/modules/sample/sample.module').then((m) => m.SampleModule),
      },
      {
        path: 'enhancer',
        loadChildren: () => import('src/app/modules/enhancer/enhancer.module').then((m) => m.EnhancerModule),
      },
      {
        path: 'help',
        loadChildren: () => import('src/app/modules/help/help.module').then((m) => m.HelpModule)
      },
            {
        path: 'contact',
        loadChildren: () => import('src/app/modules/contact/contact.module').then((m) => m.ContactModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
