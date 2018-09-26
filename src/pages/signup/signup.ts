import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import { WelcomePage } from '../welcome/welcome';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, password: string } = {
    name: '',
    email: '',
    password: ''
  };

  // Our translated text strings
  private signupErrorString: string = "Unable to create account. Please check your account information and try again.";

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController) { }

  doSignup() {
    // Attempt to login in through our User service
    this.user.register(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
