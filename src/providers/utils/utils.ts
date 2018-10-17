import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';

@Injectable()
export class Utils {

    constructor(
        private toastCtrl: ToastController,
        private alertCtrl: AlertController) { }

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
     * Shows a confirmation alert.
     * @param text Messsage
     * @param f The function to be executed on confirmation
     */
    public confirmAlert(text: string, f: (value: any) => void): void {
        let alert = this.alertCtrl.create({
            message: text,
            buttons: [
                {
                    text: 'Ok',
                    handler: f
                }
            ]
        });
        alert.present();
    }
}
