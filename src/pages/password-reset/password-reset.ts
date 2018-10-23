import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController } from "ionic-angular";
import { PasswordValidator } from "../../providers/utils/formValidation";

@IonicPage()
@Component({
    selector: "page-password-reset",
    templateUrl: "password-reset.html"
})
export class PasswordResetPage {
    form: FormGroup;

    constructor(
        public navCtrl: NavController,
        // private user: User,
        // private utils: Utils,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group(
            {
                password: ["", [Validators.required]],
                confirmPassword: ["", [Validators.required]]
            },
            { validator: PasswordValidator.validate.bind(this) }
        );
    }

    // resetPassword(): void {
    //     this.user.resetPassword(this.form.controls.password.value).subscribe(
    //         resp => {
    //             this.navCtrl.push(MainPage);
    //         },
    //         err => {
    //             console.error("ERROR: ", err);

    //             if (err.status === 500) {
    //                 this.utils.presentToast(global_500Error);
    //             } else if (err.status === 502) {
    //                 this.utils.presentToast(global_500Error);
    //             } else if (err.status === 422) {
    //                 this.utils.presentToast(global_422Error);
    //             } else {
    //                 this.utils.presentToast(passwordReset_passwordErrorString);
    //             }
    //         }
    //     );
    // }
}
