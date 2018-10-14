import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Utils {

    constructor(
        private toastController: ToastController) { }

    /**
     * Show a message with a toast.
     * @param text Message
     * @param time Display time in milisecons
     */
    public presentToast(text: string, time?: number): void {
        let toast = this.toastController.create({
            message: text,
            duration: (time != null) ? time : 3000,
            position: 'top'
        });
        toast.present();
    }
}
