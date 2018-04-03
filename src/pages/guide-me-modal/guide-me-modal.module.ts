import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { GuideMeModalPage } from './guide-me-modal';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GuideMeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(GuideMeModalPage),
    ComponentsModule
  ],
})
export class GuideMeModalPageModule { }
