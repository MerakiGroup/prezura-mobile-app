import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GlobalDataService {

  public isSideMenuOpen = new Subject<boolean>();

  constructor() {
  }

  public openSideMenu(): void {
    this.isSideMenuOpen.next(true)
  }

  public closeSideMenu(): void {
    this.isSideMenuOpen.next(false);
  }

  public getMenuOpenState(): Observable<boolean> {
    return this.isSideMenuOpen.asObservable();
  }
}
