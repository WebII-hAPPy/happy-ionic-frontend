import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import {
    AlertController,
    IonicPage,
    NavController,
    NavParams,
    Platform
} from "ionic-angular";
import { MainPage } from "..";
import { Api, User, Utils } from "../../providers";
import {
    global_401Error,
    global_500Error,
    passwordReset_failure,
    passwordReset_invalidEmail,
    passwordReset_noEmail,
    passwordReset_success,
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

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private user: User,
        private storage: Storage,
        public alertController: AlertController,
        private utils: Utils,
        private api: Api,
        private platform: Platform,
        private alertCtrl: AlertController
    ) {
        this.platform.registerBackButtonAction(() => {
            const leaveAlert = this.alertCtrl.create({
                title: "Exit app",
                message: "Do you really want to exit?",
                buttons: [
                    {
                        text: 'Exit',
                        handler: () => {
                            platform.exitApp();
                        }
                    }, {
                        text: 'Cancel',
                        handler: () => {
                            leaveAlert.dismiss();
                        }
                    }
                ]
            });
            leaveAlert.present();
        }, 1);
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

                            this.utils.navigateToNewRoot("WelcomePage").then(() => {
                                this.utils.presentToast(global_401Error)
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

    changePassword(): void {
        const userEmail: string = this.user.getUser().email;
        this.storage.get("jwt_token").then(val => {
            this.api.post("resetPassword", { email: userEmail }).subscribe(
                resp => {
                    this.storage.clear();

                    this.utils.navigateToNewRoot(WelcomePage).then(() => {
                        this.utils.presentToast(passwordReset_success);
                    });
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
        });
    }
}
