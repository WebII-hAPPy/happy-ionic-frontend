import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
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
    public toastCtrl: ToastController) { }

  /**
   * login in through our User service
   */
  doRegister(): void {
    this.user.register(this.account).subscribe((resp) => {

      let verficationMailToast = this.toastCtrl.create({
        message: this.verificationMailString,
        duration: 4000,
        position: 'top'
      });
      verficationMailToast.present();

      this.user.login(this.account).subscribe((val) => {
        this.navCtrl.push(MainPage);
      }, (err) => {
        let autoLoginError = this.toastCtrl.create({
          message: this.autoLoginErrorString,
          duration: 3000,
          position: 'top'
        });
        autoLoginError.present();
        this.navCtrl.push(LoginPage);
      });
    }, (err) => {

      let errorToast = this.toastCtrl.create({
        message: this.registerErrorString,
        duration: 3000,
        position: 'top'
      });
      errorToast.present();
    });
  }
}
