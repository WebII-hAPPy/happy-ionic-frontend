import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { IonicStorageModule } from "@ionic/storage";
import {
    IonicErrorHandler,
    IonicModule,
    NavController,
    NavParams
} from "ionic-angular";
import { MyApp } from "../../app/app.component";
import { Api } from "../../providers";
import { WelcomePage } from "../welcome/welcome";

describe("WelcomePage", () => {
    let component: any;
    let fixture: ComponentFixture<any>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, WelcomePage],
            imports: [
                BrowserModule,
                HttpClientModule,
                IonicModule.forRoot(MyApp, { preloadModules: true }),
                IonicStorageModule.forRoot()
            ],
            providers: [
                NavController,
                {
                    provide: NavParams,
                    useClass: WelcomePage
                },
                Api,
                // Keep this to enable Ionic's runtime error handling during development
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomePage);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("Should create the welcome page", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Should redirect to login page when choosing login option", () => {
        const navCtrl = fixture.debugElement.injector.get(NavController);
        spyOn(navCtrl, "push");

        component.login();

        expect(navCtrl.push).toHaveBeenCalledWith("LoginPage");
    });
});
