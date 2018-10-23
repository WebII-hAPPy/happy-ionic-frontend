import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, ToastController } from "ionic-angular";
import { MainPage } from "..";
import { User, Utils } from "../../providers";
import {
    global_422Error,
    global_500Error,
    passwordReset_passwordErrorString
} from "../../providers/utils/strings";

@IonicPage()
@Component({
    selector: "page-password-reset",
    templateUrl: "password-reset.html"
})
export class PasswordResetPage {
    form: FormGroup = this.fb.group(
        {
            password: ["", [Validators.required]],
            repeatPassword: [""]
        },
        { Validators: this.checkPassword }
    );

    constructor(
        public navCtrl: NavController,
        private user: User,
        private toastCtrl: ToastController,
        private utils: Utils,
        private fb: FormBuilder
    ) {}

    resetPassword(): void {
        this.user.resetPassword(this.form.controls.password.value).subscribe(
            resp => {
                this.navCtrl.push(MainPage);
            },
            err => {
                console.error("ERROR: ", err);

                if (err.status === 500) {
                    this.utils.presentToast(global_500Error);
                } else if (err.status === 502) {
                    this.utils.presentToast(global_500Error);
                } else if (err.status === 422) {
                    this.utils.presentToast(global_422Error);
                } else {
                    this.utils.presentToast(passwordReset_passwordErrorString);
                }
            }
        );
    }

    private checkPassword(fg: FormGroup) {
        const password: string = fg.controls.password.value;
        const repeatPassword: string = fg.controls.repeatPassword.value;

        return password === repeatPassword ? null : { notSame: true };
    }
}
