import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Chart } from 'chart.js';
import { Socket } from 'ng-socket-io';
import { PressureData, UserStatsService } from '../../providers/user-stats-service/user-stats-service';
import { SocketService } from '../../providers/socket-service/socket-service';

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

  constructor(private userStatsService: UserStatsService, private socketService: SocketService) {
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
    this.socketService.connect();
    this.socketService.emit('getPressureData');
  }

  public ionViewDidLoad(): void {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, this.defaultConfigs);
    this.userStatsService.initializePressureChart(this.lineChart, this.labels, {
      left: this.leftFootData,
      right: this.rightFootData
    });
  }
}
