import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Point } from '../../models/heatmap-point';
import { SocketService } from '../../providers/socket-service/socket-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnDestroy {
  public data: Point[];

  public title = 'Prezura';

  private subscription: Subscription;

  constructor(private socketService: SocketService) {
    this.subscription = this.socketService.getHeatMapData().subscribe((response: { data: Point[] }) => {
      this.data = response.data;
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
  }
}
