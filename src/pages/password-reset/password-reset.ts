import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
    IonicPage,
    NavController,
    Platform,
    ToastController
} from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { MainPage } from "..";
import { User, Utils } from "../../providers";
import { BackButtonOverwrite } from "../../providers/backButton/backButton";
import { CustomFormValidator } from "../../providers/utils/formValidation";
import {
    global_422Error,
    global_500Error,
    passwordReset_passwordErrorString,
    global_401Error,
    global_404Error
} from "../../providers/utils/strings";

@IonicPage()
@Component({
    selector: "page-password-reset",
    templateUrl: "password-reset.html"
})
export class PasswordResetPage {
    form: FormGroup;
    exitCounter: number;

    constructor(
        public navCtrl: NavController,
        private user: User,
        private utils: Utils,
        private fb: FormBuilder,
        private platform: Platform,
        private toastCtrl: ToastController
    ) {
        this.exitCounter = 0;
        const overwrite: BackButtonOverwrite = new BackButtonOverwrite(
            this.platform,
            this.navCtrl,
            this.toastCtrl
        );
        overwrite.overwriteBackButtonPop();

        this.form = this.fb.group(
            {
                password: ["", [Validators.required]],
                confirmPassword: ["", [Validators.required]]
            },
            { validator: CustomFormValidator.validatePasswords.bind(this) }
        );
    }

    /**
     * Request password update from server and logs user in when successful
     */
    async resetPassword(): Promise<void> {
        const seq: Observable<ArrayBuffer> = await this.user.resetPassword(
            this.form.controls.password.value
        );
        seq.subscribe(
            resp => {
                this.utils.navigateToNewRoot(MainPage);
            },
            err => {

                if (err.status === 500) {
                    this.utils.presentToast(global_500Error);
                } else if (err.status === 502) {
                    this.utils.presentToast(global_500Error);
                } else if (err.status === 422) {
                    this.utils.presentToast(global_422Error);
                } else if (err.status === 401) {
                    this.utils.presentToast(global_401Error);
                } else if (err.status === 404) {
                    this.utils.presentToast(global_404Error);
                } else {
                    this.utils.presentToast(passwordReset_passwordErrorString);
                }
            }
        );
    }
}
