import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { GuideMeModalPage } from '../guide-me-modal/guide-me-modal';

/**
 * Generated class for the GuideMePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guide-me',
  templateUrl: 'guide-me.html',
})
export class GuideMePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuideMePage');
  }

  openModal() {
    const modal = this.modalCtrl.create(GuideMeModalPage);
    modal.present();
  }

}
