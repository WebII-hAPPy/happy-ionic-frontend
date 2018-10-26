import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import {
    AlertController,
    IonicPage,
    NavController,
    NavParams,
    Platform,
    ToastController
} from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { share } from "rxjs/operators";
import { MainPage } from "..";
import { Api, User, Utils } from "../../providers";
import { BackButtonOverwrite } from "../../providers/backButton/backButton";
import {
    global_401Error,
    global_500Error,
    passwordReset_failure,
    passwordReset_invalidEmail,
    passwordReset_noEmail,
    passwordReset_suc,
    settings_accountDeleted,
    settings_accountDeletedError
} from "../../providers/utils/strings";
import { AboutPage } from "../about/about";
import { WelcomePage } from "../welcome/welcome";

@IonicPage()
@Component({
    selector: "page-settings",
    templateUrl: "settings.html"
})
export class SettingsPage {
    model = { name: "" };
    exitCounter: number;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private user: User,
        private storage: Storage,
        public alertController: AlertController,
        private utils: Utils,
        private api: Api,
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
     * Changes the name of a user
     */
    changeName(): void {
        const userId: number = this.user.getUser().id;

        this.storage.get("jwt_token").then(val => {
            this.api
                .put("api/changeName/" + userId, this.model, {
                    headers: { authorization: val }
                })
                .subscribe(
                    response => {
                        this.utils.navigateToNewRoot(MainPage).then(() => {
                            this.utils.presentToast(
                                "Successfully updated your name."
                            );
                        });
                    },
                    err => {
                        if (err.status === 401) {
                            this.storage.clear();

                            this.utils
                                .navigateToNewRoot("WelcomePage")
                                .then(() => {
                                    this.utils.presentToast(global_401Error);
                                });
                        } else if (err.status === 500 || err.status === 502) {
                            this.utils.presentToast(global_500Error);
                        } else {
                            this.utils.presentToast(
                                "Could not update your name."
                            );
                        }
                    }
                );
        });
    }

    /**
     * Deletes a account
     */
    deleteAccount(): void {
        const userId: number = this.user.getUser().id;

        this.storage.get("jwt_token").then(val => {
            this.api
                .delete("api/deleteAccount/" + userId, {
                    headers: { authorization: val }
                })
                .subscribe(
                    response => {
                        this.storage.clear();

                        this.utils.navigateToNewRoot(WelcomePage).then(() => {
                            this.utils.presentToast(settings_accountDeleted);
                        });
                    },
                    err => {
                        if (err.status === 401) {
                            this.storage.clear();

                            this.utils
                                .navigateToNewRoot(WelcomePage)
                                .then(() => {
                                    this.utils.presentToast(global_401Error);
                                });
                        } else if (err.status === 500 || err.status === 502) {
                            this.utils.presentToast(global_500Error);
                        } else {
                            this.utils.presentToast(
                                settings_accountDeletedError
                            );
                        }
                    }
                );
        });
    }

    /**
     * Shows a alert to ask the user if he really wants to delete his account.
     */
    showDeleteAccountAlert(): void {
        let alert = this.alertController.create({
            title: "Confirm deletion",
            message: "Are you sure you want to delete your account?",
            buttons: [
                {
                    text: "Cancel",
                    role: "cancel"
                },
                {
                    text: "Delete",
                    handler: () => this.deleteAccount()
                }
            ]
        });
        alert.present();
    }

    /**
     * Logs the user out and displays the welcome page.
     */
    logout(): void {
        this.user.logout();
        this.utils.navigateToNewRoot(WelcomePage);
    }

    about(): void {
        this.navCtrl.push(AboutPage);
    }

    showChangePasswordAlert(): void {
        let alert = this.alertController.create({
            title: "New Password",
            message: "Please confirm your new password.",
            enableBackdropDismiss: false,
            inputs: [
                {
                    name: "password",
                    type: "password"
                },
                {
                    name: "confirmPassword",
                    type: "password"
                }
            ],
            buttons: [
                {
                    text: "Change Password",
                    handler: data => {
                        if (data.password === data.confirmPassword) {
                            this.changePassword(data);
                        } else {
                            alert.setMessage(
                                `<b class="schrott" style="color: red;">Password must match</b>`
                            );
                            return false;
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    async changePassword(data: {
        password: string;
        confirmPassword: string;
    }): Promise<void> {
        const jwt_token: string = await this.storage.get("jwt_token");
        const seq: Observable<ArrayBuffer> = this.api
            .put(
                "api/updatePassword",
                { password: data.password },
                { headers: { authorization: jwt_token } }
            )
            .pipe(share());

        seq.subscribe(
            resp => {
                this.utils.presentToast(passwordReset_suc);
            },
            err => {
                if (err.status === 401) {
                    this.storage.clear();
                    this.utils.navigateToNewRoot(WelcomePage).then(() => {
                        this.utils.presentToast(global_401Error);
                    });
                } else if (err.status === 500 || err.status === 502) {
                    this.utils.presentToast(global_500Error);
                } else if (err.status === 403) {
                    this.utils.presentToast(passwordReset_invalidEmail);
                } else if (err.status === 422) {
                    this.utils.presentToast(passwordReset_noEmail);
                } else {
                    this.utils.presentToast(passwordReset_failure);
                }
            }
        );
    }
}
