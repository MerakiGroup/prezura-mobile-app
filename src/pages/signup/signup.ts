import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContainerPage } from '../container/container';
import { UserAuthService } from '../../providers/user-auth-service/user-auth-service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signUpForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private userService: UserAuthService) {
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  /**
   * Event handler for login form submission.
   */
  public onSubmit(): void {
    if (this.signUpForm.invalid) {
      return;
    }
    const formData = this.signUpForm.value;
    this.userService.userSignup(
      {
        name: formData.username,
        password: formData.password,
        username: formData.email
      }
    ).subscribe((res) => {
      this.navCtrl.push(ContainerPage);
    });
  }

  /**
   * Build the login form.
   */
  private buildForm(): void {
    this.signUpForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      rememberMe: [false],
      username: [null, Validators.required],
    });
  }

}
