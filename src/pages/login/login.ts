import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User, Utils } from '../../providers';
import { MainPage } from '../';
import { IAccountInfo } from '../../models/accountinfo';
import { login_loginErrorString } from '../../providers/utils/strings';

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

  constructor(
    public navCtrl: NavController,
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
      this.utils.presentToast(login_loginErrorString);
    });
  }
}
