import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: "page-notifications",
  templateUrl: "notifications.html"
})
export class NotificationsPage {

  private static green_color = '#27ae60';
  private static red_color = '#c0392b';
  private static orange_color = '#e67e22';
  private static yellow_color = '#f39c12';

  public max = 100;
  public min = 0;
  public bloodPressure = 0;
  public bpColor = '';
  public diabLegs = 0;
  public dlColor = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public ionViewDidLoad(): void {
    this.bloodPressure = this.generateRandomValue();
    this.bpColor = this.getColorCode(this.bloodPressure);
    this.diabLegs = this.generateRandomValue();
    this.dlColor = this.getColorCode(this.diabLegs);
  }

  public generateRandomValue(): number {
    return Math.random() * (this.max - this.min) + this.min;
  };

  public getColorCode(value): string {
    if (value > 0 && value < 25) {
      return NotificationsPage.green_color;
    } else if (value >= 25 && value < 50) {
      return NotificationsPage.orange_color;
    } else if (value >= 50 && value < 75) {
      return NotificationsPage.yellow_color;
    } else {
      return NotificationsPage.red_color;
    }
  }
}
