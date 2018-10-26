import { Component } from "@angular/core";
import {
    IonicPage,
    NavController,
    NavParams,
    Platform,
    ToastController
} from "ionic-angular";
import { BackButtonOverwrite } from "../../providers/backButton/backButton";

@IonicPage()
@Component({
    selector: "page-about",
    templateUrl: "about.html"
})
export class AboutPage {
    exitCounter: number;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private platform: Platform,
        private toastCtrl: ToastController
    ) {
        const overwrite: BackButtonOverwrite = new BackButtonOverwrite(
            this.platform,
            this.navCtrl,
            this.toastCtrl
        );
        overwrite.overwriteBackButtonPop();
    }
}
