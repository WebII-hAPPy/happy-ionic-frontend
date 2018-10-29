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
import { LoginPage } from "../login/login";

describe("LoginPage", () => {
    let component: any;
    let fixture: ComponentFixture<any>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, LoginPage],
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
                    useClass: LoginPage
                },
                Api,
                User,
                Utils,
                // Keep this to enable Ionic's runtime error handling during development
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        });
    }));

    afterEach(() => {
        fixture.destroy();
        de = null;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
    });

    it("Should create the login page", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Should perform login action upon button press", () => {
        spyOn(component, "doLogin");

        de = fixture.debugElement.query(By.css("form"));
        de.triggerEventHandler("submit", null);

        expect(component.doLogin).toHaveBeenCalled();
    });
});
