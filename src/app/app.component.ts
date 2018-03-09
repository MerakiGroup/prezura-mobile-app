import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { GlobalDataService } from '../providers/global-data-service/global-data-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private globalDataService: GlobalDataService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // document.addEventListener('menubutton', () => {
      //   this.globalDataService.openSideMenu();
      //   console.log('aaaaa');
      // })
      //
      // document.addEventListener('backButton', () => {
      //   this.globalDataService.openSideMenu();
      //   console.log('aaaaa');
      // })
    });

  }
}

