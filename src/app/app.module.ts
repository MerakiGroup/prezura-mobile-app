import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginPageModule } from '../pages/login/login.module';
import { GuideMePageModule } from '../pages/guide-me/guide-me.module';
import { StatsPageModule } from '../pages/stats/stats.module';
import { NotificationsPageModule } from '../pages/notifications/notifications.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { ContainerPageModule } from '../pages/container/container.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { GuideMeModalPageModule } from '../pages/guide-me-modal/guide-me-modal.module';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { GlobalDataService } from '../providers/global-data-service/global-data-service';
import {
  apiEndPoint,
  UserAuthService
} from '../providers/user-auth-service/user-auth-service';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AlertServiceProvider } from '../providers/alert-service/alert-service';
import { ComponentsModule } from '../components/components.module';
import { SocketService } from '../providers/socket-service/socket-service';
import { HttpInterceptorProvider } from '../providers/http-interceptor/http-interceptor';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageSettingsPageModule } from '../pages/language-settings/language-settings.module';

const config: SocketIoConfig = { url: apiEndPoint, options: {} };


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  bootstrap: [IonicApp],
  declarations: [MyApp, HomePage],
  entryComponents: [MyApp, HomePage],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LoginPageModule,
    StatsPageModule,
    GuideMePageModule,
    NotificationsPageModule,
    ProfilePageModule,
    ContainerPageModule,
    SocketIoModule.forRoot(config),
    SignupPageModule,
    HttpClientModule,
    ComponentsModule,
    GuideMeModalPageModule,
    LanguageSettingsPageModule,
    TranslateModule.forRoot({
      loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GlobalDataService,
    NativeStorage,
    UserAuthService,
    Facebook,
    GooglePlus,
    AlertServiceProvider,
    SocketService,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorProvider,
    }
  ]
})
export class AppModule {
}
