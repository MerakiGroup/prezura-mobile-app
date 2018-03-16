import { IonicPageModule } from 'ionic-angular';

import { NgModule } from '@angular/core';

import { StatsPage } from './stats';

import { UserStatsService } from '../../providers/user-stats-service/user-stats-service';

@NgModule({
  declarations: [
    StatsPage,
  ],
  imports: [
    IonicPageModule.forChild(StatsPage),
  ],
  providers: [
    UserStatsService
  ]
})
export class StatsPageModule {}
