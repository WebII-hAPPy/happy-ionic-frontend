import { Component } from "@angular/core";
import {
    IonicPage,
    NavController,
    Platform,
    ToastController
} from "ionic-angular";
import { BackButtonOverwrite } from "../../providers/backButton/backButton";

@IonicPage()
@Component({
    selector: "page-welcome",
    templateUrl: "welcome.html"
})
export class WelcomePage {
    exitCounter: number;

    constructor(
        public navCtrl: NavController,
        private platform: Platform,
        private toastCtrl: ToastController
    ) {
        this.exitCounter = 0;
        const overwrite: BackButtonOverwrite = new BackButtonOverwrite(
            this.platform,
            this.navCtrl,
            this.toastCtrl
        );
        overwrite.overwriteBackButtonToast();
    }

    /**
     * Navigates the view to the login page.
     */
    login(): void {
        this.navCtrl.push("LoginPage");
    }

    /**
     * Navigates the view to the signup page.
     */
    register(): void {
        this.navCtrl.push("RegisterPage");
    }

    /**
     * Navigates the view to the about page.
     */
    about(): void {
        this.navCtrl.push("AboutPage");
    }

    public registerChildNav(nav: any) {
        // do nothing
    }

    public unregisterChildNav(nav: any) {
        // do nothing
    }
}
