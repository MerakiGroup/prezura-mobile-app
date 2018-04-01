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
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300
    })
  ]
})

export class NotificationsPageModule { }
