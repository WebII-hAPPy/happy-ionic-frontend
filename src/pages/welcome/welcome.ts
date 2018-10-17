import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {

    constructor(
        public navCtrl: NavController) {
    }

    /**
     * Navigates the view to the login page.
     */
    login(): void {
        this.navCtrl.push('LoginPage');
    }

    /**
     * Navigates the view to the signup page.
     */
    register(): void {
        this.navCtrl.push('RegisterPage');
    }
}
