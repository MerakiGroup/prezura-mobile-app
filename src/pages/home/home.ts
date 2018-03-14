import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as hm from 'heatmap.js';

// declare const h337: any;

interface Point {
  x: number;
  y: number;
  value: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private data: Point[];
  private heatmap: any;

  constructor(public navCtrl: NavController) {
  }

  @ViewChild('div')
  public div: any;


  ionViewDidLoad() {
    this.heatmap = hm.create({
      container: this.div.nativeElement
    });
    this.data = this.generatePoints();
    this.heatmap.setData({
      data: this.data,
      max: 5
    });
  }

  public onRandomDataClick(): void {
    this.data = this.generatePoints();
    this.heatmap.setData({
      data: this.data,
      max: 5
    });
  }

  private generatePoints(): Point[] {
    const points: Point[] = [];

    for (let i = 0; i < 500; i++) {
      points.push(
        {
          value: this.getRandomInt(5),
          x: this.getRandomInt(600),
          y: this.getRandomInt(600)
        }
      );
    }
    return points;
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
