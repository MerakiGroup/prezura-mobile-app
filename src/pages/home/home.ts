import { NavController } from 'ionic-angular';

import { AfterViewInit, Component, ViewChild } from '@angular/core';

import * as hm from 'heatmap.js';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
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

  constructor(public navCtrl: NavController, private socket: Socket) {
    this.getMessages().subscribe((response: {data: Point[]}) => {
      this.data = response.data;
      this.heatmap.setData({
        data: this.data,
        max: 5
      });
    });
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
    this.socket.connect();
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

  private getMessages() {
    const observable = new Observable(observer => {
      this.socket.on('data', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
}
