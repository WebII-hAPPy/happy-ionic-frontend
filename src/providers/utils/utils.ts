import { Injectable } from '@angular/core';
import { ToastController, App } from 'ionic-angular';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import { TabsPage } from 'pages/tabs/tabs';

@Injectable()
export class Utils {

    constructor(
        private toastCtrl: ToastController,
        private app: App) { }

    /**
     * Show a message with a toast.
     * @param text Message
     * @param time Display time in milisecons
     */
    public presentToast(text: string, time?: number): void {
        let toast = this.toastCtrl.create({
            message: text,
            duration: (time != null) ? time : 3000,
            position: 'top'
        });
        toast.present();
    }

    /**
     * Sets a new app root page. 
     * @param page The new root page
     */
    public navigateToNewRoot(page: Page | TabsPage | string) {
        return this.app.getRootNavs()[0].setRoot(page, null, { animate: true, direction: 'forward' });
    }
}
