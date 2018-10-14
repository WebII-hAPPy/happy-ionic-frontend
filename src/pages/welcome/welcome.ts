import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { MainPage } from '../';

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {

    constructor(public navCtrl: NavController,
        private storage: Storage) {
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

    /**
     * Runs when the page is about to enter and become the active page.
     */
    ionViewWillEnter(): void {
        this.storage.get('jwt_token').then((value) => {
            if (value != null) {
                this.navCtrl.push(MainPage);
            }
        });
    }
}
