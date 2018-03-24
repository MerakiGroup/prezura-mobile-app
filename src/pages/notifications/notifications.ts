import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-notifications",
  templateUrl: "notifications.html"
})
export class NotificationsPage {
  max = 100;
  min = 0;
  bloodPressure = 0;
  bpColor = "";
  diabLegs = 0;
  dlColor = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad NotificationsPage");

    this.bloodPressure = this.generateRandomValue();
    this.bpColor = this.getColorCode(this.bloodPressure);
    this.diabLegs = this.generateRandomValue();
    this.dlColor = this.getColorCode(this.diabLegs);

    console.log(this.bloodPressure);
  }

  generateRandomValue = () => {
    return Math.random() * (this.max - this.min) + this.min;
  };

  getColorCode = value => {
    if (value > 0 && value < 25) {
      return "#27ae60";
    } else if (value >= 25 && value < 50) {
      return "#e67e22";
    } else if (value >= 50 && value < 75) {
      return "#f39c12";
    } else {
      return "#c0392b";
    }
  };
}
