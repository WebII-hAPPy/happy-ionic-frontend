import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User, Utils } from '../../providers';
import { MainPage } from '..';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  account: { name: string, email: string, password: string } = {
    name: '',
    email: '',
    password: ''
  };

  private registerErrorString: string = "Unable to create account. Please check your account information and try again.";
  private verificationMailString: string = "Hi! The hAPPy team send you a verification mail. Please also check your spam folder. Keep smiling!"
  private autoLoginErrorString: string = "Sorry we couldn\'t log you in... Please try again."

  constructor(
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    private utils: Utils) { }

  /**
   * login in through our User service
   */
  doRegister(): void {
    this.user.register(this.account).subscribe((resp) => {
      this.utils.presentToast(this.verificationMailString, 4000);
      this.user.login(this.account).subscribe((val) => {
        this.navCtrl.push(MainPage);
      }, (err) => {
        this.utils.presentToast(this.autoLoginErrorString);
        this.navCtrl.push(LoginPage);
      });
    }, (err) => {
      this.utils.presentToast(this.registerErrorString);
    });
  }
}
