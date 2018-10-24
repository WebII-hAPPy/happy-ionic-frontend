import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, DebugElement } from "@angular/core";
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
import { RegisterPage } from "../register/register";
import { StatsPage } from "../stats/stats";
import { TabsPage } from "../tabs/tabs";
import { WelcomePage } from "../welcome/welcome";
import { SettingsPage } from "./settings";
import { DebugContext } from "@angular/core/src/view";

describe("SettingsPage", () => {
    let component: SettingsPage;
    let fixture: ComponentFixture<SettingsPage>;
    let deleteButton: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, SettingsPage],
            imports: [
                BrowserModule,
                HttpClientModule,
                IonicModule.forRoot(MyApp, { preloadModules: true }),
                IonicStorageModule.forRoot()
            ],
            providers: [
                NavController,
                { provide: NavParams, useClass: WelcomePage },
                Api,
                User,
                Utils,
                // Keep this to enable Ionic's runtime error handling during development
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsPage);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        deleteButton = null;
    });

    it("Should create the settings page", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Should open confirmation test when atempting to delete account.", () => {
        spyOn(component, "showDeleteAccountAlert");

        fixture.detectChanges();

        deleteButton = fixture.debugElement.query(By.css("button[id=del]"));
        deleteButton.triggerEventHandler("click", null);

        expect(component.showDeleteAccountAlert).toHaveBeenCalled();
    });

    it("Should redirect WelcomePage upon logout", () => {
        let utils = fixture.debugElement.injector.get(Utils);
        spyOn(utils, "navigateToNewRoot");

        component.logout();

        expect(utils.navigateToNewRoot).toHaveBeenCalledWith(WelcomePage);
    });
});
