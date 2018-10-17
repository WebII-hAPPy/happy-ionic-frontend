import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { Api, User, Utils } from '../../providers';
import { WelcomePage } from '../welcome/welcome';
import { Storage } from "@ionic/storage";
import { MainPage } from '..';
import { global_401Error, global_500Error, settings_accountDeleted, settings_accountDeletedError } from '../../providers/utils/strings';

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

    model = { name: '' };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private user: User,
        private api: Api,
        private storage: Storage,
        private alertController: AlertController,
        private utils: Utils) {
    }

    /**
     * Changes the name of a user
     */
    changeName(): void {
        const userId: number = this.user.getUser().id;

        this.storage.get('jwt_token').then((val) => {
            this.api.put('api/changeName/' + userId, this.model, { headers: { authorization: val } }).subscribe((response) => {
                this.navCtrl.push(MainPage).then(() => this.utils.presentToast('Successfully updated your name.'));
            }, err => {
                if (err.status === 401) {
                    this.storage.clear();
                    this.navCtrl.push('WelcomePage').then(() => this.utils.presentToast(global_401Error));
                } else if (err.status === 500 || err.status === 502) {
                    this.utils.presentToast(global_500Error);
                } else {
                    this.utils.presentToast('Could not update your name.');
                }
            });
        });
    }

    /**
     * Deletes a account
     */
    deleteAccount(): void {
        const userId: number = this.user.getUser().id;

        this.storage.get('jwt_token').then((val) => {
            this.api.delete('api/deleteAccount/' + userId, { headers: { authorization: val } }).subscribe((response) => {
                this.storage.clear();

                this.navCtrl.push(WelcomePage).then(() => this.utils.presentToast(settings_accountDeleted));
            }, err => {
                if (err.status === 401) {
                    this.storage.clear();
                    this.navCtrl.push('WelcomePage').then(() => this.utils.presentToast(global_401Error));
                } else if (err.status === 500 || err.status === 502) {
                    this.utils.presentToast(global_500Error);
                } else {
                    this.utils.presentToast(settings_accountDeletedError);
                }
            });
        })
    }

    /**
     * Shows a alert to ask the user if he really wants to delete his account.
     */
    showDeleteAccountAlert(): void {
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
     * Runs when the page is about to enter and becomes the active page.
     */
    ionViewWillEnter(): void {
        this.page = this.navParams.get('page') || this.page;
        this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;
        this.model.name = '';
    }
}
