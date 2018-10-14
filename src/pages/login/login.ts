import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User, Utils } from '../../providers';
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
    public toastCtrl: ToastController,
    private utils: Utils) { }

  /**
   * Login trough the user service. Else show error.
   */
  doLogin(): void {
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      console.error("ERR:  ", err);
      this.utils.presentToast(this.loginErrorString);
    });
  }
}
