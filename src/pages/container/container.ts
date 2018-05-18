import { IonicPage, NavController, Tabs, Nav } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { Component, ViewChild } from '@angular/core';

import { UserAuthResponse } from '../login/login.models';

import { HomePage } from '../home/home';
import { StatsPage } from '../stats/stats';
import { NotificationsPage } from '../notifications/notifications';
import { GuideMePage } from '../guide-me/guide-me';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';

import { UserAuthService } from '../../providers/user-auth-service/user-auth-service';
import { LanguageSettingsPageModule } from '../language-settings/language-settings.module';
import { LanguageSettingsPage } from '../language-settings/language-settings';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-container',
  templateUrl: 'container.html',
})
export class ContainerPage {

  @ViewChild('myTabs') tabRef: Tabs;
  @ViewChild(Nav) nav: Nav;

  public homePage = HomePage;
  public statsPage = StatsPage;
  public notificationsPage = NotificationsPage;
  public guideMePage = GuideMePage;

  public rootPage: any = StatsPage;

  public pages: Array<{ title: string, page: any }>;

  public user: UserAuthResponse;

  constructor(public navCtrl: NavController,
              private nativeStorage: NativeStorage,
              private userAuthService: UserAuthService, private translateService: TranslateService) {
    this.pages = [
      { title: 'Home', page: HomePage },
      { title: 'Stats', page: StatsPage },
      { title: 'Alerts', page: NotificationsPage },
      { title: 'Guide Me', page: GuideMePage },
      { title: 'Language Settings', page: LanguageSettingsPage }
    ];
    this.translateService.stream(
      ['SIDE_MENU.HOME', 'SIDE_MENU.STATS', 'SIDE_MENU.ALERTS', 'SIDE_MENU.GUIDE_ME', 'SIDE_MENU.LANGUAGE_SETTINGS'])
      .subscribe((res) => {
      this.pages[0].title = res['SIDE_MENU.HOME'];
      this.pages[1].title = res['SIDE_MENU.STATS'];
      this.pages[2].title = res['SIDE_MENU.ALERTS'];
      this.pages[3].title = res['SIDE_MENU.GUIDE_ME'];
      this.pages[4].title = res['SIDE_MENU.LANGUAGE_SETTINGS'];
    });
    this.getUserData();
  }

  public ionViewDidEnter(): void {
    // this.tabRef.select(1);
    this.tabRef.select(0);
  }

  public redirectToProfile(): void {
    this.navCtrl.push(ProfilePage);
  }

  public openPage(page): void {
    const index = this.pages.findIndex((item) => {
      return item.title === page.title;
    });
    if (index && index < 4) {
      this.tabRef.select(index);
    } else {
      this.navCtrl.push(page.page);
    }
  }

  public onLogOutClick(): void {
    this.userAuthService.logOut().then((res) => {
      console.log(this.navCtrl.getViews());
      this.navCtrl.pop();
    });
  }

  private getUserData(): void {
    this.nativeStorage.getItem('user').then((user) => {
      this.user = user;
    });
  }
}
