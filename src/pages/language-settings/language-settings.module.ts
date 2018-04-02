import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LanguageSettingsPage } from './language-settings';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LanguageSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(LanguageSettingsPage),
    TranslateModule
  ],
})
export class LanguageSettingsPageModule {}
