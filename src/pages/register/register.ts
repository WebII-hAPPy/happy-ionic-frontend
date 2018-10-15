import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User, Utils } from '../../providers';
import { MainPage } from '..';
import { LoginPage } from '../login/login';
import { register_verificationMailString, register_autoLoginErrorString, register_registerErrorString } from '../../providers/utils/strings';

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
      this.utils.presentToast(register_verificationMailString, 4000);
      this.user.login(this.account).subscribe((val) => {
        this.navCtrl.push(MainPage);
      }, (err) => {
        this.utils.presentToast(register_autoLoginErrorString);
        this.navCtrl.push(LoginPage);
      });
    }, (err) => {
      this.utils.presentToast(register_registerErrorString);
    });
  }
}
