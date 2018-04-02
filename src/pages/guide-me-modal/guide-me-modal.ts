import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the GuideMeModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guide-me-modal',
  templateUrl: 'guide-me-modal.html',
})
export class GuideMeModalPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuideMeModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
