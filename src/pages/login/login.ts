import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import { IAccountInfo } from '../../models/accountinfo';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  

  account: IAccountInfo = {
    email: '',
    password: ''
  };

  private loginErrorString: string = "Unable to sign in. Please check your account information and try again.";

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController) { }

  /**
   * Login trough the user service. Else show error.
   */
  doLogin(): void {
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
