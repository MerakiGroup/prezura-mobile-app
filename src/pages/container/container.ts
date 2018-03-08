import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Nav, MenuController } from 'ionic-angular';

import { Page } from 'ionic-angular/navigation/nav-util';
import { HomePage } from '../home/home';
import { StatsPage } from '../stats/stats';
import { NotificationsPage } from '../notifications/notifications';
import { GuideMePage } from '../guide-me/guide-me';
import { GlobalDataService } from '../../providers/global-data-service/global-data-service';

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

  constructor(public navCtrl: NavController, private globalDataService: GlobalDataService, public menuCtrl: MenuController) {
    this.pages = [
      { title: 'Home', page: HomePage },
      { title: 'Stats', page: StatsPage },
      { title: 'Alerts', page: NotificationsPage },
      { title: 'Guide Me', page: GuideMePage },
    ];
    this.globalDataService.getMenuOpenState().subscribe((open) => {
      if (open) {
        this.menuCtrl.open();
      }
    })
  }

  ionViewDidEnter() {
    this.tabRef.select(1);
    this.tabRef.select(0);
  }

  openPage(page) {
    debugger;
    const index = this.pages.findIndex((item) => {
      return item.title == page.title;
    });
    this.tabRef.select(index);
    // this.nav.setRoot(page.component);
  }
}
