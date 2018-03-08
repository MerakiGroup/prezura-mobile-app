import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuideMePage } from './guide-me';

@NgModule({
  declarations: [
    GuideMePage,
  ],
  imports: [
    IonicPageModule.forChild(GuideMePage),
  ],
})
export class GuideMePageModule {}
