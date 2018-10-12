import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Api, User } from '../../providers';
import { WelcomePage } from '../welcome/welcome';
import { Storage } from "@ionic/storage";
import { MainPage } from '..';

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

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public user: User,
        private api: Api,
        private storage: Storage,
        private alertController: AlertController,
        private toastController: ToastController) {
    }

    /**
     * Changes the name of a user
     */
    changeName(): void {
        const userId: number = this.user.getUser().id;

        this.storage.get('jwt_token').then((val) => {
            this.api.put('api/changeName/' + userId, this.model, { headers: { authorization: val } }).subscribe((response) => {
                this.navCtrl.push(MainPage).then(() => this.presentToast('Successfully updated your name.'));
            }, err => {
                if (err.status === 401) {
                    this.storage.clear();
                    this.navCtrl.push('WelcomePage').then(() => this.presentToast('You are not logged in...'));
                } else {
                    this.presentToast('Could not update your name.');
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

                this.navCtrl.push(WelcomePage).then(() => this.presentToast('Your account was successfully deleted.'));
            }, err => {
                if (err.status === 401) {
                    this.storage.clear();
                    this.navCtrl.push('WelcomePage').then(() => this.presentToast('You are not logged in...'));
                } else {
                    this.presentToast('Could not delete your account.');
                }
            });
        })
    }

    /**
     * Shows a alert to ask the user if he really wants to delete his account.
     */
    showAlert(): void {
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
   * Show a message with a toast.
   * @param text Message
   */
    private presentToast(text: string): void {
        let toast = this.toastController.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    /**
     * Runs when the page has finished leaving and is no longer the active page.
     */
    ionViewWillEnter(): void {
        this.page = this.navParams.get('page') || this.page;
        this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;
        this.model.name = '';
    }
}
