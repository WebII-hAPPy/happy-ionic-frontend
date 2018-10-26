import {
    AlertController,
    NavController,
    Platform,
    ToastController
} from "ionic-angular";

export class BackButtonOverwrite {
    exitCounter: number;

    constructor(
        private alertCtrl: AlertController,
        private platform: Platform,
        private navCtrl: NavController,
        private toastCtrl: ToastController
    ) {
        this.exitCounter = 0;
    }

    public overwriteBackButtonToast() {
        this.platform.registerBackButtonAction(() => {
            if (this.exitCounter == 0) {
                this.exitCounter++;
                this.presentToast();
                setTimeout(() => {
                    this.exitCounter = 0;
                }, 2000);
            } else {
                this.platform.exitApp();
            }
        }, 1);
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: "Press again to exit",
            duration: 2000,
            position: "bottom"
        });
        toast.present();
    }

    public overwriteBackButtonPop() {
        this.platform.registerBackButtonAction(() => {
            if (this.navCtrl.length() > 2) {
                this.overwriteBackButtonPop();
            } else {
                this.overwriteBackButtonToast();
            }
            this.navCtrl.pop();
        }, 1);
    }

    public overwriteBackButtonPopAndReturn() {
        this.platform.registerBackButtonAction(() => {
            this.navCtrl.pop();
            this.overwriteBackButtonToast();
        });
    }
}
