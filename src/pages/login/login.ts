import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User, Utils, Strings } from '../../providers';
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

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    private utils: Utils,
    private strings: Strings) { }

  /**
   * Login trough the user service. Else show error.
   */
  doLogin(): void {
    this.user.login(this.account).subscribe((resp) => {

      this.navCtrl.push(MainPage);
    }, (err) => {

      console.error("ERR:  ", err);
      this.utils.presentToast(this.strings.login_loginErrorString);
    });
  }
}
