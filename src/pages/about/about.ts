import { Component } from "@angular/core";
import {
    AlertController,
    IonicPage,
    NavController,
    NavParams,
    Platform
} from "ionic-angular";

@IonicPage()
@Component({
    selector: "page-about",
    templateUrl: "about.html"
})
export class AboutPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private platform: Platform,
        private alertCtrl: AlertController
    ) {
        this.platform.registerBackButtonAction(() => {
            this.platform.registerBackButtonAction(() => {
                const leaveAlert = this.alertCtrl.create({
                    title: "Exit app",
                    message: "Do you really want to exit?",
                    buttons: [
                        {
                            text: "Exit",
                            handler: () => {
                                platform.exitApp();
                            }
                        },
                        {
                            text: "Cancel",
                            handler: () => {
                                leaveAlert.dismiss();
                            }
                        }
                    ]
                });
                leaveAlert.present();
            }, 1);
            this.navCtrl.pop();
        }, 1);
    }
}
