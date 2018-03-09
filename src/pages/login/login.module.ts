import { IonicPageModule } from 'ionic-angular';

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    BrowserAnimationsModule
  ],
  providers: [
  ]
})

export class LoginPageModule {
}
