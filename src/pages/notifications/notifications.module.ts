import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { NotificationsPage } from './notifications';

@NgModule({
  declarations: [
    NotificationsPage
  ],
  imports: [
    IonicPageModule.forChild(NotificationsPage),
    NgCircleProgressModule.forRoot({
      animationDuration: 300,
      innerStrokeColor: '#C7E596',
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      outerStrokeWidth: 16,
      radius: 100
    })
  ]
})

export class NotificationsPageModule {
}
