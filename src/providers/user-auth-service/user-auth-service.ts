import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { Loading } from 'ionic-angular';

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { UserAuthResponse } from '../../pages/login/login.models';

@Injectable()
export class UserAuthService {
  private onLogin = new Subject<boolean>();
  private isUserLoggedIn: boolean;
  private isFacebookLogin: boolean;

  constructor(private facebook: Facebook, private googlePlus: GooglePlus, private nativeStorage: NativeStorage) {
  }

  /**
   * Using facebook api to log in th user.
   */
  public loginWithFacebook(): void {
    this.facebook.login(['public_profile', 'user_friends', 'email'])
      .then((response: FacebookLoginResponse) => {
        if (response.status === 'connected') {
          this.getUserDetail(response.authResponse.userID);
          this.isUserLoggedIn = true;
          this.isFacebookLogin = true;
          this.onLogin.next(true);
        }
      }).catch((error) => {
      // toDo log
    });
  }

  /**
   * Using google api to log in the user.
   */
  public loginWithGoogle(loading: Loading): void {
    this.googlePlus.login({})
      .then(res => {
        const user = {
          email: res.email,
          firstName: res.givenName,
          gender: '',
          id: res.userId,
          imageUrl: res.imageUrl,
          lastName: res.familyName
        };
        this.saveUserToNativeStorage(user);
        this.isUserLoggedIn = true;
        this.isFacebookLogin = false;
        this.onLogin.next(true);
        loading.dismiss();
      }).catch((error) => {
      // toDo log
      loading.dismiss();
    });
  }

  public logOut(): Promise<boolean> {
    return new Promise((resolve) => {
      this.isFacebookLogin ? this.logoutFromFacebook() : this.logoutFromGoogle();
      this.onLogin.next(false);
      resolve(true);
    });
  }

  /**
   * Returns the user login state as an observable.
   * @returns {Observable<boolean>} Login state observable.
   */
  public getLoginState(): Observable<boolean> {
    return this.onLogin.asObservable();
  }

  /**
   * Responsible for log out the user from facebook api.
   */
  private logoutFromFacebook(): void {
    this.facebook.logout()
      .then(res => {
        this.removeUserFromNativeStorage();
        this.isUserLoggedIn = false;
      }).catch((error) => {
      // toDo log
    });
  }

  /**
   * Responsible for log out the user from google api.
   */
  private logoutFromGoogle(): void {
    this.googlePlus.logout()
      .then(res => {
        this.removeUserFromNativeStorage();
        this.isUserLoggedIn = false;
      }).catch((error) => {
      // toDo log
    });
  }

  /**
   * Get user detail by using facebook api.
   * @param userId User ID.
   */
  private getUserDetail(userId) {
    this.facebook.api('/' + userId + '/?fields=id,email,name,picture,gender', ['public_profile'])
      .then((response) => {
        const user = {
          email: response.email,
          firstName: response.name,
          gender: response.gender,
          id: userId,
          imageUrl: response.picture.data.url,
          lastName: ''
        };
        this.saveUserToNativeStorage(user);
      }).catch((error) => {
      // toDo log
    });
  }

  /**
   * Responsible for storing user data in native storage
   */
  private saveUserToNativeStorage(user: UserAuthResponse): void {
    this.nativeStorage.setItem('user', user);
  }

  /**
   * Responsible for removing user from native storage.
   */
  private removeUserFromNativeStorage(): void {
    this.nativeStorage.remove('user');
  }
}
