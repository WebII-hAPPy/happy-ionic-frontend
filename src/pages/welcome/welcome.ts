import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

@IonicPage()
@Component({
    selector: "page-welcome",
    templateUrl: "welcome.html"
})
export class WelcomePage {

    constructor(public navCtrl: NavController) { }

    /**
     * Navigates the view to the login page.
     */
    login(): void {
        this.navCtrl.push("LoginPage");
    }

    /**
     * Navigates the view to the signup page.
     */
    register(): void {
        this.navCtrl.push("RegisterPage");
    }

    /**
     * Navigates the view to the about page.
     */
    about(): void {
        this.navCtrl.push("AboutPage");
    }

    public registerChildNav(nav: any) {
        // do nothing
    }

    public unregisterChildNav(nav: any) {
        // do nothing
    }
}
