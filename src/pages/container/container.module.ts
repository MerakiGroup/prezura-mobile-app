import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContainerPage } from './container';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ContainerPage,
  ],
  imports: [
    IonicPageModule.forChild(ContainerPage),
    TranslateModule
  ],
})
export class ContainerPageModule {}
