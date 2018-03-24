import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Socket } from 'ng-socket-io';

export interface PressureData {
  data: {
    left: number;
    right: number
  };
  label: string;
}

@Injectable()
export class UserStatsService {

  private static get_initial_data_url = '/api/user/data/pressure/initial';
  private static get_pressure_data_url = '/api/user/data/pressure/initial';

  constructor(public http: HttpClient, private socket: Socket) {
    console.log('Hello UserStatsServiceProvider Provider');
  }

  // public getInitialData(): Observable<any[]> {
  //   return this.http.get<any[]>(UserStatsService.get_initial_data_url);
  // }
  //
  // public getPressureData(): Observable<any[]> {
  //   return this.http.get<any[]>(UserStatsService.get_pressure_data_url);
  // }

  public getHeatMapData(): Observable<PressureData> {
    const observable = new Observable<PressureData>(observer => {
      this.socket.on('pressureDiff', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }


  public getInitialData() {

  }

  public getDynamicData() {

  }


  public addPressureData(chart: any, label: string, data: { left: number, right: number }): void {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(data.left);
    chart.data.datasets[1].data.push(data.right);
    chart.update();
  }


  public removePressureData(chart: any): void {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
    chart.update();
  }


  public initializePressureChart(chart: any, labels: string[], data: { left: number[], right: number[] }): void {
    labels.forEach((label: string) => {
      chart.data.labels.push(label);
    });
    data.left.forEach((value: number) => {
      chart.data.datasets[0].data.push(value);
    });

    data.right.forEach((value: number) => {
      chart.data.datasets[1].data.push(value);
    });
    chart.update();
  }
}
