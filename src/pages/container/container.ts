import { IonicPage, NavController, Tabs, Nav } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { Component, ViewChild } from '@angular/core';

import { UserAuthResponse } from '../login/login.models';

import { HomePage } from '../home/home';
import { StatsPage } from '../stats/stats';
import { NotificationsPage } from '../notifications/notifications';
import { GuideMePage } from '../guide-me/guide-me';
import { LoginPage } from '../login/login';

import { UserAuthService } from '../../providers/user-auth-service/user-auth-service';

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
              private nativeStorage: NativeStorage, private userAuthService: UserAuthService) {
    this.pages = [
      { title: 'Home', page: HomePage },
      { title: 'Stats', page: StatsPage },
      { title: 'Alerts', page: NotificationsPage },
      { title: 'Guide Me', page: GuideMePage },
    ];
    this.getUserData();
  }

  public ionViewDidEnter(): void {
    this.tabRef.select(1);
    this.tabRef.select(0);
  }

  public openPage(page): void {
    const index = this.pages.findIndex((item) => {
      return item.title === page.title;
    });
    this.tabRef.select(index);
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
