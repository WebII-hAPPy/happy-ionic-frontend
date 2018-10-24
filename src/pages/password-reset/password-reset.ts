import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController } from "ionic-angular";
import { CustomFormValidator } from "../../providers/utils/formValidation";
import { User, Utils } from "../../providers";
import { MainPage } from "..";
import {
    global_500Error,
    global_422Error,
    passwordReset_passwordErrorString
} from "../../providers/utils/strings";
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
    selector: "page-password-reset",
    templateUrl: "password-reset.html"
})
export class PasswordResetPage {
    form: FormGroup;

    constructor(
        public navCtrl: NavController,
        private user: User,
        private utils: Utils,
        private fb: FormBuilder
    ) {
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
}
