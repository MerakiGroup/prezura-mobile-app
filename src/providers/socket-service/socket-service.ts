import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Socket } from 'ng-socket-io';

/**
 * Service representing SocketService.
 */
@Injectable()
export class SocketService {

  private static data_event = 'data';

  constructor(private socket: Socket) {

  }

  /**
   * Responsible for connecting to pre configured socket.
   */
  public connect(): void {
    this.socket.connect();
  }

  /**
   * Responsible for disconnecting from a socket.
   */
  public disconnect(): void {
    this.socket.disconnect();
  }

  /**
   * Responsibel for emitting an event for a connected socket instance.
   * @param {string} event Event name.
   */
  public emit(event: string): void {
    this.socket.emit(event);
  }

  /**
   * Returns a Observable for subscribed for socket data fech eveent.
   * @returns {Observable<any>} Observer
   */
  public getHeatMapData() {
    return new Observable(observer => {
      this.socket.on(SocketService.data_event, data => {
        observer.next(data);
      });
    });
  }

}
