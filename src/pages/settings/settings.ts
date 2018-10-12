import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

import {Api, User} from '../../providers';
import {WelcomePage} from '../welcome/welcome';
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {


    aboutSettings = {
        page: 'about',
        pageTitleKey: 'about'
    };
    about: any = SettingsPage;

    page: string = 'main';
    pageTitleKey: string = 'Settings';

    name: string = '';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public user: User,
                private api: Api,
                private storage: Storage,
                private alertController: AlertController) {
    }

    /**
     * Changes the name of a user
     */
    // TODO: correct endpoint; do not hardcode jwt_token; handle responses
    changeName() {
        this.storage.get('jwt_token').then((val) => {
            this.api.put('/api/changeName', {'name': name}, { headers: { authorization: val } }).subscribe((response) => {
                this.name = '';
            });
        });
    }

    /**
     * Deletes a account
     */
    // TODO: correct endpoint; do not hardcode jwt_token; handle response
    deleteAccount() {
        this.storage.get('jwt_token').then((val) => {
            this.api.delete('/api/delete', { headers: { authorization: val } }).subscribe((response) => {
                this.navCtrl.push(WelcomePage);
            });
        })
    }

    /**
     * Shows a alert to ask the user if he really wants to delete his account.
     */
    showAlert() {
        let alert = this.alertController.create({
            title: 'Confirm deletion',
            message: 'Are you sure you want to delete your account?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Delete',
                    handler: () => this.deleteAccount()
                }
            ]
        });
        alert.present();
    }

    /**
     * Logs the user out and displays the welcome page.
     */
    logout(): void {
        this.user.logout();
        this.navCtrl.push(WelcomePage);
    }

    /**
     * Runs when the page has finished leaving and is no longer the active page.
     */
    ionViewWillEnter(): void {
        this.page = this.navParams.get('page') || this.page;
        this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;
        this.name = '';
    }
}
