import {Component, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import {Point} from '../../models/heatmap-point';
import {SocketService} from '../../providers/socket-service/socket-service';
import {TranslateService} from '@ngx-translate/core';
import {ToastController} from 'ionic-angular';
import {Toast} from 'ionic-angular/components/toast/toast';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnDestroy {
  public data: Point[];

  public title = 'Prezura';

  private subscription: Subscription;
  private toast: Toast;

  constructor(private socketService: SocketService, private translateService: TranslateService, private toastCtrl: ToastController) {
    this.subscription = this.socketService.getHeatMapData().subscribe((response: { data: Point[] }) => {
      // console.log(response.data);
      if (!this.toast) {
        this.toast = this.toastCtrl.create({
          duration: 2500,
          message: 'Connected to device!',
          position: 'top'
        });
        this.toast.present();
      }


      this.data = response.data;
    });
    this.translateService.stream('HOME_PAGE.TITLE').subscribe((res) => {
      this.title = res;
    });
    this.socketService.connect();
    this.socketService.emit('getData');
  }

  /**
   * On component destroy.
   */
  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Event handler for onConnectClick
   */
  public onConnectClick(): void {
    this.socketService.connect();
    this.socketService.emit('getData');
  }

  /**
   * Event handler for onConnectClick
   */
  public onDisconnectClick(): void {
    this.socketService.disconnect();
    const toast = this.toastCtrl.create({
      duration: 2500,
      message: 'Disconnected from device!',
      position: 'top'
    });
    toast.present();
    this.toast = null;
  }
}
