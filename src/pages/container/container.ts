import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tabs, Nav } from 'ionic-angular';
import { HomePage } from '../home/home';
import { StatsPage } from '../stats/stats';
import { NotificationsPage } from '../notifications/notifications';
import { GuideMePage } from '../guide-me/guide-me';
import { UserAuthResponse } from '../login/login.models';
import { NativeStorage } from '@ionic-native/native-storage';

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
              private nativeStorage: NativeStorage) {
    this.pages = [
      { title: 'Home', page: HomePage },
      { title: 'Stats', page: StatsPage },
      { title: 'Alerts', page: NotificationsPage },
      { title: 'Guide Me', page: GuideMePage },
    ];
    this.getUserData();
  }

  ionViewDidEnter() {
    this.tabRef.select(1);
    this.tabRef.select(0);
  }

  openPage(page) {
    const index = this.pages.findIndex((item) => {
      return item.title == page.title;
    });
    this.tabRef.select(index);
    // this.nav.setRoot(page.component);
  }

  private getUserData(): void {
    this.nativeStorage.getItem('user').then((user) => {
      this.user = user;
    });
  }
}
