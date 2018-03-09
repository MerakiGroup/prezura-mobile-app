import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPageModule } from '../pages/login/login.module';
import { GlobalDataService } from '../providers/global-data-service/global-data-service';
import { GuideMePageModule } from '../pages/guide-me/guide-me.module';
import { StatsPageModule } from '../pages/stats/stats.module';
import { NotificationsPageModule } from '../pages/notifications/notifications.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { ContainerPageModule } from '../pages/container/container.module';
import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LoginPageModule,
    StatsPageModule,
    GuideMePageModule,
    NotificationsPageModule,
    ProfilePageModule,
    ContainerPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalDataService,
    NativeStorage
  ]
})
export class AppModule {}
