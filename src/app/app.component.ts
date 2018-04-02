import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Component } from '@angular/core';

import { LoginPage } from '../pages/login/login';
import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private translateService: TranslateService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.translateService.setDefaultLang('en');
      this.translateService.use('en');
    });
  }
}

