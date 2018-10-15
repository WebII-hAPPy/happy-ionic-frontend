import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { MainPage } from '../';
import { Api } from '../../providers';

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {

    constructor(
        public navCtrl: NavController,
        private storage: Storage,
        private api: Api) {
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
            this.api.post('api/verifyToken', null, { headers: { authorization: value } }).subscribe((res) => {
                if (res) {
                    this.navCtrl.push(MainPage, {
                        autoLogin: true
                    });
                }
            }, (err) => { });
        });
    }
}
