import {
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController
} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { } from 'amazon-cognito-identity-js';

import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { UserAuthResponse } from './login.models';

import { ContainerPage } from '../container/container';
import { SignupPage } from '../signup/signup';

import { UserAuthService } from '../../providers/user-auth-service/user-auth-service';

import { animations } from './login.animations';

import config from '../../assets/configuration';

/**
 * Class representing the Login page.
 * @class LoginPage.
 */
@IonicPage()
@Component({
  animations: animations,
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage implements OnDestroy {
  public user: UserAuthResponse;
  public loginForm: FormGroup;
  public isSubmitted: boolean;
  public isLoggedInClicked: boolean;
  public isKeyBoardOpen: boolean;
  public isPasswordField: boolean;
  public loading: any;

  private isLoggedIn: boolean;
  private userSubscription: Subscription;
  private keyBoardSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService,
    private nativeStorage: NativeStorage,
    private loadingCtrl: LoadingController
  ) {
    this.isLoggedIn = false;
    this.isSubmitted = false;
    this.isLoggedInClicked = false;
    this.isKeyBoardOpen = false;
    this.isPasswordField = true;
    this.buildForm();
    // fb.getLoginStatus()
    //   .then(res => {
    //     if (res.status === 'connect') {
    //       this.isLoggedIn = true;
    //     } else {
    //       this.isLoggedIn = false;
    //     }
    //   }).catch((error) => {
    //   this.showError(error);
    // });
    this.userAuthService.getLoginState().subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.navCtrl.push(ContainerPage);
      }
    });
    this.userLoggedIn();
  }

  /**
   * On component destroy.
   */
  public ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.keyBoardSubscription) {
      this.keyBoardSubscription.unsubscribe();
    }
  }

  /**
   * responsible for using facebook api for login in the user.
   */
  public onFacebookLoginClick(): void {
    this.userAuthService.loginWithFacebook();
  }

  /**
   * Login with google plus api.
   * Invokes when the login with google plus button clicked.
   */
  public onGoogleLoginClick(): void {
    const loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.userAuthService.loginWithGoogle(loading);
  }

  /**
   * Event handler for logout button click.
   */
  public onLogoutClick(): void {
    this.userAuthService.logOut();
  }

  /**
   * Event handler for login form submission.
   */
  public onSubmit(): void {
    this.isSubmitted = true;
    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.navCtrl.push(ContainerPage);
    // this.loading.present();

    // this.userAuthService.loginUsingCognito(email, password, this);
  }

  cognitoCallback = (message, result) => {
    this.loading.dismiss();
    if (message) {
      this.loading.dismiss();
    }
    if (result) {
      this.navCtrl.push(ContainerPage);
    }
  }

  public async signInUsingCognito(username, password) {
    console.log('user', username);
  }

  /**
   * Event handler for sign up link click.
   */
  public onSignUpClick(): void {
    this.navCtrl.push(SignupPage);
  }

  /**
   * Event handler for input field focus event.
   * @param eventPayLoad Event payload.
   */
  public onFocus(eventPayLoad): void {
    this.isKeyBoardOpen = true;
  }

  /**
   * Event handler for input field blur event.
   * @param eventPayLoad Event payload.
   */
  public onBlur(eventPayLoad): void {
    this.isKeyBoardOpen = false;
  }

  /**
   * Event handler for go back click.
   */
  public onGoBackClick(): void {
    this.isLoggedInClicked = false;
  }

  /**
   * Build the login form.
   */
  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [null, Validators.required],
      rememberMe: [false]
    });
  }

  /**
   * Getter for user loggedIn
   * @returns {boolean} Return true if user is logged in.
   */
  private userLoggedIn(): void {
    this.nativeStorage.getItem('user').then(
      user => {
        if (user) {
          this.navCtrl.push(ContainerPage);
        }
      },
      error => {
        // toDo
      }
    );
  }

  public authenticateUsingCognito() { }

}
