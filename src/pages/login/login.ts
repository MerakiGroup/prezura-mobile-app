import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public users: any;
  public loginForm: FormGroup;

  private loginResponse: FacebookLoginResponse;
  private isLoggedIn: boolean;

  constructor(public navCtrl: NavController, private fb: Facebook, public alertCtrl: AlertController, private formBuilder: FormBuilder) {
    this.isLoggedIn = false;
    this.buildForm();
    fb.getLoginStatus()
      .then(res => {
        if (res.status === 'connect') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }).catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public loginWithFacebook(): void {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.loginResponse = res;
        if (res.status === 'connected') {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      }).catch((error) => {
      const alertData: AlertData = {
        title: 'Login Failed',
        subTitle: 'Please try again'
      };
      this.showAlert(alertData);
    });
  }

  public loginWithGPlus(): void {

  }

  public logoutFromGPlus(): void {

  }

  public logoutFromFacebook() {
    this.fb.logout()
      .then(res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }

  public onSubmit(): void {

  }

  public onSignUpClick(): void {

  }

  private getUserDetail(userid) {
    this.fb.api('/' + userid + '/?fields=id,email,name,picture,gender', ['public_profile'])
      .then(res => {
        const alertData: AlertData = {
          title: 'Login Successful',
          subTitle: 'Congratulations'
        };
        this.showAlert(alertData);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }

  private showAlert(alertData: AlertData) {
    let alert = this.alertCtrl.create({
      title: alertData.title,
      subTitle: alertData.subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      rememberMe: [true]
    });
  }

}


interface AlertData {
  title: string;
  subTitle: string;
}
