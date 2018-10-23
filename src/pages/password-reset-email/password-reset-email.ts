import { IonicPage, NavController } from "ionic-angular";
import { Component } from "@angular/core";
import { Api, Utils } from "../../providers";
import { Observable } from "rxjs/Observable";
import {
    global_500Error,
    global_422Error,
    login_loginErrorString,
    passwordResetEmail_passwordErrorString
} from "../../providers/utils/strings";

@IonicPage()
@Component({
    selector: "page-password-reset-email",
    templateUrl: "password-reset-email.html"
})
export class PasswordResetEmailPage {
    private email: string = "";

    constructor(
        private api: Api,
        private navCtrl: NavController,
        private utils: Utils
    ) {}

    requestPasswordReset() {
        let seq: Observable<ArrayBuffer> = this.api.post("resetEmail", {
            email: this.email
        });

        seq.subscribe(
            (res: any) => {
                this.navCtrl.pop();
            },
            err => {
                console.error("ERROR ", err);
                if (err.status === 500) {
                    this.utils.presentToast(global_500Error);
                } else if (err.status === 502) {
                    this.utils.presentToast(global_500Error);
                } else if (err.status === 422) {
                    this.utils.presentToast(global_422Error);
                } else {
                    this.utils.presentToast(
                        passwordResetEmail_passwordErrorString
                    );
                }
            }
        );
    }
}
