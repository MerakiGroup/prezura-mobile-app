import { IonicPageModule } from 'ionic-angular';

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginPage } from './login';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    BrowserAnimationsModule,
    TranslateModule
  ],
  providers: [
  ]
})

export class LoginPageModule {
}
