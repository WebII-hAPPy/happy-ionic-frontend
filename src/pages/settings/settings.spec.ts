import { HttpClientModule } from "@angular/common/http";
import { DebugElement, ErrorHandler } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule, By } from "@angular/platform-browser";
import { IonicStorageModule } from "@ionic/storage";
import {
    IonicErrorHandler,
    IonicModule,
    NavController,
    NavParams
} from "ionic-angular";
import { MyApp } from "../../app/app.component";
import { Api, User, Utils } from "../../providers";
import { WelcomePage } from "../welcome/welcome";
import { SettingsPage } from "./settings";
import { UserMock } from "../../../test-config/mock-ionic";

describe("SettingsPage", () => {
    let component: any;
    let fixture: ComponentFixture<any>;
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
                { provide: User, useClass:  UserMock},
                Api,
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
