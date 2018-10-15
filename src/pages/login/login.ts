import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User, Utils } from '../../providers';
import { MainPage } from '../';
import { IAccountInfo } from '../../models/accountinfo';
import { login_loginErrorString, global_500Error } from '../../providers/utils/strings';

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

      if (err.status === 500) {
        this.utils.presentToast(global_500Error);
      } else if (err.status === 502) {
        this.utils.presentToast(global_500Error);
      } else {
        this.utils.presentToast(login_loginErrorString);
      }
    });
  }
}
