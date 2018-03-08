import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContainerPage } from './container';

@NgModule({
  declarations: [
    ContainerPage,
  ],
  imports: [
    IonicPageModule.forChild(ContainerPage),
  ],
})
export class ContainerPageModule {}
