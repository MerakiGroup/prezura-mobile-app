import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GlobalDataService {

  private authToken: string;

  public isSideMenuOpen = new Subject<boolean>();

  constructor() {
  }

  public openSideMenu(): void {
    this.isSideMenuOpen.next(true);
  }

  public closeSideMenu(): void {
    this.isSideMenuOpen.next(false);
  }

  public getMenuOpenState(): Observable<boolean> {
    return this.isSideMenuOpen.asObservable();
  }

  public setAuthToken(authToken: string): void {
    this.authToken = authToken;
  }

  public getAuthToken(): string {
    return this.authToken ? this.authToken : null;
  }
}
