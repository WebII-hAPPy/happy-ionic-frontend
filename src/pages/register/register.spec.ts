import { HttpClientModule } from "@angular/common/http";
import { DebugElement, ErrorHandler } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule, By } from "@angular/platform-browser";
import { Camera } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Transfer } from "@ionic-native/transfer";
import { IonicStorageModule } from "@ionic/storage";
import {
    IonicErrorHandler,
    IonicModule,
    NavController,
    NavParams
} from "ionic-angular";
import { ChartsModule } from "ng2-charts";
import { MyApp } from "../../app/app.component";
import { Api, Face, User, Utils } from "../../providers";
import { AnalysisPage } from "../analysis/analysis";
import { LoginPage } from "../login/login";
import { PicturePage } from "../picture/picture";
import { SettingsPage } from "../settings/settings";
import { StatsPage } from "../stats/stats";
import { WelcomePage } from "../welcome/welcome";
import { RegisterPage } from "./register";

describe("RegisterPage", () => {
    let component: RegisterPage;
    let fixture: ComponentFixture<RegisterPage>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MyApp,
                SettingsPage,
                WelcomePage,
                PicturePage,
                AnalysisPage,
                PicturePage,
                RegisterPage,
                StatsPage,
                LoginPage
            ],
            imports: [
                BrowserModule,
                HttpClientModule,
                ChartsModule,
                IonicModule.forRoot(MyApp, { preloadModules: true }),
                IonicStorageModule.forRoot()
            ],
            providers: [
                NavController,
                {
                    provide: NavParams,
                    useClass: RegisterPage
                },
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
        fixture = TestBed.createComponent(RegisterPage);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        de = null;
    });

    it("Should create the register page", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Should perform register action upon button press", () => {
        spyOn(component, "doRegister");

        de = fixture.debugElement.query(By.css("form"));
        de.triggerEventHandler("submit", null);

        expect(component.doRegister).toHaveBeenCalled();
    });
});
