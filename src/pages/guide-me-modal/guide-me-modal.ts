import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs/Subscription';

import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { SocketService } from '../../providers/socket-service/socket-service';

import { Point } from './../../models/heatmap-point';
import { ServerService } from '../../providers/server-service/server-service';

@IonicPage()
@Component({
  selector: 'page-guide-me-modal',
  templateUrl: 'guide-me-modal.html',
  providers: [ServerService]
})
export class GuideMeModalPage implements OnInit, OnDestroy, AfterViewInit {

  public data: Point[];

  private subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private http: HttpClient,
    private socketService: SocketService,
    private serverService: ServerService
  ) { }

  public ngOnInit(): void {
    
  }

  /**
   * ngOnDestroy() execute at the end of the lifecyle of the component
   */
  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public ngAfterViewInit(): void {
    this.getDisorderData();
  }

  /**
   * ionViewDidLoad() execute when the pageis loaded
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad GuideMeModalPage');
  }

  /**
   * dismiss() onlclick of the close button of the modal
   */
  public dismiss(): void {
    this.viewCtrl.dismiss();
  }

  /**
   * generatePoints() generate the pressure points -> according to the user data
   */
  private generatePoints(): Point[] {
    const points = [];

    for (let i = 0; i < 500; i++) {
      points.push({
        value: this.getRandomInt(255),
        x: this.getRandomInt(600),
        y: this.getRandomInt(600)
      });
    }
    return points;
  }

  /**
   * getRandomInt()
   * @param max : number
   */
  private getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private getDisorderData():void {
    this.subscription = this.serverService.getDisorderData().subscribe(disorderData => {
      console.log(disorderData);
      this.data = disorderData.data;
    });
  }

}
