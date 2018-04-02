import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuideMeModalPage } from './guide-me-modal';

@NgModule({
  declarations: [
    GuideMeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(GuideMeModalPage),
  ],
})
export class GuideMeModalPageModule {}
