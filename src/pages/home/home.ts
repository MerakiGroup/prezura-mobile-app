import { NavController } from 'ionic-angular';

import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as heatMap from 'heatmap.js';
import { Socket } from 'ng-socket-io';

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
  public data: Point[];
  private heatMap: any;

  constructor(public navCtrl: NavController, private socket: Socket) {
    this.getHeatMapData().subscribe((response: { data: Point[] }) => {
      this.data = response.data;
    });
    this.socket.connect();
    this.socket.emit('getData');
  }

  /**
   * On ionic view did load.
   */
  public ionViewDidLoad(): void {
    // this.heatMap = heatMap.create({
    //   container: this.div.nativeElement
    // });
    // this.data = this.generatePoints();
    // const data = this.data ? this.data : this.generatePoints();
    // this.setHeatMapData(data);
  }

  /**
   * Event handler for onConnectClick
   */
  public onConnectClick(): void {
    this.socket.connect();
    this.socket.emit('getData');
  }

  /**
   * Event handler for onConnectClick
   */
  public onDisconnectClick(): void {
    this.socket.disconnect();
  }

  /**
   * Generates random data set for heat map.
   * @returns {Point[]} Generated heat map data.
   */
  private generatePoints(): Point[] {
    const points: Point[] = [];

    for (let i = 0; i < 500; i++) {
      points.push({
        value: this.getRandomInt(5),
        x: this.getRandomInt(600),
        y: this.getRandomInt(600)
      });
    }
    this.setHeatMapData(points);
    return points;
  }

  /**
   * Generates a random number.
   * @param {number} max Maximum value of genrated number.
   * @returns {number} Generated number.
   */
  private getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  /**
   * Returns a Observable for subscribed for socket data fech eveent.
   * @returns {Observable<any>} Observer
   */
  private getHeatMapData() {
    const observable = new Observable(observer => {
      this.socket.on('data', data => {
        observer.next(data);
      });
    });
    return observable;
  }

  /**
   * Set heat map data.
   * @param {Point[]} data Heat map data
   */
  private setHeatMapData(data: Point[]): void {
    this.data = data;
    this.heatMap.setData({
      data: this.data,
      max: 255
    });
  }
}
