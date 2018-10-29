import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { IonicStorageModule } from "@ionic/storage";
import { IonicErrorHandler, IonicModule, NavController } from "ionic-angular";
import { MyApp } from "../../app/app.component";
import { Api, User, Utils } from "../../providers";
import { PasswordResetEmailPage } from "./password-reset-email";

describe("PasswordResetEmailPage", () => {
    let component: any;
    let fixture: ComponentFixture<any>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, PasswordResetEmailPage],
            imports: [
                BrowserModule,
                HttpClientModule,
                IonicModule.forRoot(MyApp, { preloadModules: true }),
                IonicStorageModule.forRoot()
            ],
            providers: [
                NavController,
                Api,
                User,
                Utils,
                // Keep this to enable Ionic's runtime error handling during development
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordResetEmailPage);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("Should create the picture page", async(() => {
        expect(component).toBeTruthy();
    }));
});
