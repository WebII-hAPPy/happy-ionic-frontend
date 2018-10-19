import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { Camera } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Transfer } from "@ionic-native/transfer";
import { IonicStorageModule } from "@ionic/storage";
import { IonicErrorHandler, IonicModule, NavController } from "ionic-angular";
import { ChartsModule } from "ng2-charts";
import { MyApp } from "../../app/app.component";
// import {  Face, User, Utils } from "../../providers";
import { Api } from "../../providers/api/api";
import { Face } from "../../providers/face/face";
import { User } from "../../providers/user/user";
import { Utils } from "../../providers/utils/utils";
import { LoginPage } from "./login";
import { WelcomePage } from "../welcome/welcome";

describe("LoginPage", () => {
    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, LoginPage, WelcomePage],
            imports: [
                BrowserModule,
                HttpClientModule,
                ChartsModule,
                IonicModule.forRoot(MyApp, { preloadModules: true }),
                IonicStorageModule.forRoot()
            ],
            providers: [
                NavController,
                Api,
                User,
                Camera,
                Face,
                Utils,
                Transfer,
                FilePath,
                SplashScreen,
                StatusBar,
                // Keep this to enable Ionic's runtime error handling during development
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("Should create the login page", async(() => {
        expect(component).toBeTruthy();
    }));
});
