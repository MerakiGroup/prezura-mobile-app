import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';
import { HomePage } from '../home/home';
import { StatsPage } from '../stats/stats';
import { NotificationsPage } from '../notifications/notifications';
import { GuideMePage } from '../guide-me/guide-me';

@IonicPage()
@Component({
  selector: 'page-container',
  templateUrl: 'container.html',
})
export class ContainerPage {

  @ViewChild('myTabs') tabRef: Tabs;

  public homePage = HomePage;
  public statsPage = StatsPage;
  public notificationsPage = NotificationsPage;
  public guideMePage = GuideMePage;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {
    this.tabRef.select(1);
    this.tabRef.select(0);
  }
}
