import { Component } from "@angular/core";
import {
    IonicPage,
    NavController,
    Platform,
    ToastController
} from "ionic-angular";
import { MainPage } from "../";
import { IAccountInfo } from "../../models/accountinfo";
import { User, Utils } from "../../providers";
import { BackButtonOverwrite } from "../../providers/backButton/backButton";
import {
    global_422Error,
    global_500Error,
    login_loginErrorString
} from "../../providers/utils/strings";
import { PasswordResetEmailPage } from "../password-reset-email/password-reset-email";
import { PasswordResetPage } from "../password-reset/password-reset";

@IonicPage()
@Component({
    selector: "page-login",
    templateUrl: "login.html"
})
export class LoginPage {
    account: IAccountInfo = {
        email: "",
        password: ""
    };

    exitCounter: number;
    exitCount: number;

    constructor(
        public navCtrl: NavController,
        public user: User,
        public toastCtrl: ToastController,
        private utils: Utils,
        private platform: Platform
    ) {
        this.exitCount = 0;
        const overwrite: BackButtonOverwrite = new BackButtonOverwrite(
            this.platform,
            this.navCtrl,
            this.toastCtrl
        );
        overwrite.overwriteBackButtonPop();
    }

    /**
     * Login trough the user service. Else show error.
     */
    doLogin(): void {
        this.user.login(this.account).subscribe(
            (resp: any) => {
                if (resp.data.user.passwordReset) {
                    this.navCtrl.push(PasswordResetPage);
                } else {
                    this.utils.navigateToNewRoot(MainPage);
                }
            },
            err => {
                console.error("ERR: ", err);

                if (err.status === 500) {
                    this.utils.presentToast(global_500Error);
                } else if (err.status === 502) {
                    this.utils.presentToast(global_500Error);
                } else if (err.status === 422) {
                    this.utils.presentToast(global_422Error);
                } else {
                    this.utils.presentToast(login_loginErrorString);
                }
            }
        );
    }

    navigateToPasswordReset(): void {
        this.navCtrl.push(PasswordResetEmailPage);
    }
}
