import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { Api, User } from '../../providers';
import { MainPage } from '..';

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {

    constructor(
        public navCtrl: NavController,
        private storage: Storage,
        private api: Api,
        private user: User) {
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
