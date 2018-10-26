import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
    IonicPage,
    NavController,
    Platform,
    ToastController
} from "ionic-angular";
import { MainPage } from "..";
import { User, Utils } from "../../providers";
import { BackButtonOverwrite } from "../../providers/backButton/backButton";
import { CustomFormValidator } from "../../providers/utils/formValidation";
import {
    global_500Error,
    register_autoLoginErrorString,
    register_registerErrorString,
    register_verificationMailString
} from "../../providers/utils/strings";
import { LoginPage } from "../login/login";

@IonicPage()
@Component({
    selector: "page-register",
    templateUrl: "register.html"
})
export class RegisterPage {
    account: { name: string; email: string; password: string } = {
        name: "",
        email: "",
        password: ""
    };

    form: FormGroup;

    exitCounter: number;

    constructor(
        public navCtrl: NavController,
        public user: User,
        public toastCtrl: ToastController,
        private utils: Utils,
        private fb: FormBuilder,
        private platform: Platform
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
                name: ["", [Validators.required]],
                email: [
                    "",
                    [
                        Validators.required,
                        CustomFormValidator.validateEmail(/^.+@.+$/)
                    ]
                ],
                password: ["", [Validators.required]],
                confirmPassword: ["", [Validators.required]]
            },
            {
                validator: CustomFormValidator.validatePasswords.bind(this)
            }
        );
    }

    /**
     * login in through our User service
     */
    doRegister(): void {
        this.account = {
            name: this.form.controls.name.value,
            email: this.form.controls.email.value,
            password: this.form.controls.password.value
        };

        this.user.register(this.account).subscribe(
            resp => {
                this.utils.presentToast(register_verificationMailString, 4000);
                this.user.login(this.account).subscribe(
                    val => {
                        this.utils.navigateToNewRoot(MainPage);
                    },
                    err => {
                        this.utils.presentToast(register_autoLoginErrorString);
                        this.navCtrl.push(LoginPage);
                    }
                );
            },
            err => {
                if (err.status === 500) {
                    this.utils.presentToast(global_500Error);
                } else if (err.status === 502) {
                    this.utils.presentToast(global_500Error);
                } else {
                    this.utils.presentToast(register_registerErrorString);
                }
            }
        );
    }
}
