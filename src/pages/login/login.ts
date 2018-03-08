import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertData, UserAuthResponse } from './login.models';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { ContainerPage } from '../container/container';


/**
 * Class representing the Login page.
 * @class LoginPage.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user: UserAuthResponse;
  public loginForm: FormGroup;
  public isSubmitted: boolean;

  private isLoggedIn: boolean;
  private isFBLogin: boolean;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private fb: Facebook,
              private googlePlus: GooglePlus) {

    this.isLoggedIn = false;
    this.isSubmitted = false;
    this.buildForm();
  }


  /**
   * Event handler for logout button click.
   */
  public onLogoutClick(): void {
    this.isFBLogin ? this.logoutFromFacebook() : this.logoutFromGPlus();
  }

  /**
   * Event handler for login form submission.
   */
  public onSubmit(): void {
    this.isSubmitted = true;
    this.navCtrl.push(ContainerPage);
  }

  /**
   * Event handler for sign up link click.
   */
  public onSignUpClick(): void {

  }

  /**
   * Logout from google account.
   * Invokes when logout button clicked.
   */
  private logoutFromGPlus(): void {
    this.googlePlus.logout()
      .then(res => {
        this.user = null;
        this.isLoggedIn = false;
      }).catch((error) => {
      this.showError(error);
    });
  }

  /**
   * Logout from facebook account.
   * Invokes when logout button clicked.
   */
  private logoutFromFacebook() {
    this.fb.logout()
      .then(res => {
        this.isLoggedIn = false;
        this.user = null;
      }).catch((error) => {
      this.showError(error);
    });
  }

  /**
   * Get user detail by using facebook api.
   * @param userId User ID.
   */
  private getUserDetail(userId) {
    this.fb.api('/' + userId + '/?fields=id,email,name,picture,gender', ['public_profile'])
      .then(res => {
        const alertData: AlertData = {
          title: 'Login Successful',
          subTitle: 'Congratulations'
        };
        this.isFBLogin = true;
        this.showAlert(alertData);
        this.user = res;
        this.user = {
          id: userId,
          firstName: res.name,
          lastName: '',
          gender: res.gender,
          email: res.email,
          imageUrl: res.picture.data.url
        };
      }).catch((error) => {
      this.showError(error);
    });
  }

  /**
   * Responsible for displaying a alert message.
   * @param {AlertData} alertData Alert Data to be displayed.
   */
  private showAlert(alertData: AlertData) {
    let alert = this.alertCtrl.create({
      title: alertData.title,
      subTitle: alertData.subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  /**
   * Build the login form.
   */
  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      rememberMe: [false]
    });
  }

  /**
   * Responsible for displaying a alert with a error message.
   * @param error Error.
   */
  private showError(error): void {
    const alertData: AlertData = {
      title: 'Error',
      subTitle: error
    };
    this.showAlert(alertData);
  }

}
