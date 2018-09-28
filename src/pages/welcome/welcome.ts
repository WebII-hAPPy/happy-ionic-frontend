import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController) { }

  login(): void {
    this.navCtrl.push('LoginPage');
  }

  signup(): void {
    this.navCtrl.push('SignupPage');
  }
}
