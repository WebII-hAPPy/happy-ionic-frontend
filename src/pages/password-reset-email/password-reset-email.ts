import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Api, Utils } from "../../providers";
import {
    global_422Error,
    global_500Error,
    passwordReset_invalidEmail,
    passwordReset_passwordErrorString,
    passwordReset_success
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
        let seq: Observable<ArrayBuffer> = this.api.post("resetPassword", {
            email: this.email
        });

        seq.subscribe(
            (res: any) => {
                this.utils.presentToast(passwordReset_success);
                this.navCtrl.pop();
            },
            err => {
                if (err.status === 500) {
                    this.utils.presentToast(global_500Error);
                } else if (err.status === 502) {
                    this.utils.presentToast(global_500Error);
                } else if (err.status === 422) {
                    this.utils.presentToast(global_422Error);
                } else if (err.status === 403) {
                    this.utils.presentToast(passwordReset_invalidEmail);
                } else {
                    this.utils.presentToast(passwordReset_passwordErrorString);
                }
            }
        );
    }
}
