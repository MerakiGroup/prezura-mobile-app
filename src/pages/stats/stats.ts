import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Chart } from 'chart.js';
import { Socket } from 'ng-socket-io';
import { PressureData, UserStatsService } from '../../providers/user-stats-service/user-stats-service';

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;

  private leftFootData: number[];
  private rightFootData: number[];
  private labels: string[];
  private defaultConfigs: any;

  constructor(public navCtrl: NavController, private userStatsService: UserStatsService, private socket: Socket) {
    this.leftFootData = [50, 20, 78, 63, 77, 10, 45];
    this.rightFootData = [60, 10, 40, 30, 80, 30, 20];
    this.labels = ['10AM', '11AM', '12AM', '1PM', '2PM', '3PM', '4PM'];
    this.defaultConfigs = {
      data: {
        datasets: [{
          borderColor: 'blue',
          data: [],
          fill: false,
          label: 'Left'
        }, {
          borderColor: 'red',
          data: [],
          fill: false,
          label: 'Right'
        }],
        labels: []
      },
      options: {
        legend: {
          display: false
        },
        responsive: true
      },
      type: 'line'
    };
    this.userStatsService.getHeatMapData().subscribe((res: PressureData) => {
      this.userStatsService.addPressureData(this.lineChart, res.label, res.data);
      this.userStatsService.removePressureData(this.lineChart);
    });
    // setInterval(() => {
    //   debugger;
    //   const label = this.getDateTimeString();
    //   const left = this.getRandomInt(100);
    //   const right = this.getRandomInt(100);
    //   const data = {
    //     left,
    //     right
    //   };
    //   this.userStatsService.addPressureData(this.lineChart, label, data);
    //   this.userStatsService.removePressureData(this.lineChart);
    // }, 1500);
    this.socket.connect();
    this.socket.emit('getPressureData');
  }

  ionViewDidLoad() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, this.defaultConfigs);
    this.userStatsService.initializePressureChart(this.lineChart, this.labels, {
      left: this.leftFootData,
      right: this.rightFootData
    });
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
   * Generates random data set for heat map.
   * @returns {Point[]} Generated heat map data.
   */
  private generatePoints(): number[] {
    const points = [];

    for (let i = 0; i < 6; i++) {
      points.push(
        this.getRandomInt(100)
      );
    }
    return points;
  }

  private getDateTimeString(): string {
    const date = new Date();
    return `${date.getHours()} : ${date.getMinutes()}: ${date.getSeconds()}`;
  }
}
