import { Component } from "@angular/core";
import { IonicPage, NavController, ToastController } from "ionic-angular";
import { MainPage } from "../";
import { IAccountInfo } from "../../models/accountinfo";
import { User, Utils } from "../../providers";
import {
    global_422Error,
    global_500Error,
    login_loginErrorString
} from "../../providers/utils/strings";
import { PasswordResetPage } from "../password-reset/password-reset";
import { PasswordResetEmailPage } from "../password-reset-email/password-reset-email";

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

    constructor(
        public navCtrl: NavController,
        public user: User,
        public toastCtrl: ToastController,
        private utils: Utils
    ) {}

    /**
     * Login trough the user service. Else show error.
     */
    doLogin(): void {
        this.user.login(this.account).subscribe(
            resp => {
                if (this.user.getUser().isResetingPassword) {
                    this.navCtrl.push(PasswordResetPage);
                } else {
                    this.navCtrl.push(MainPage);
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
        this.navCtrl.push("PasswordResetEmailPage");
    }
}
