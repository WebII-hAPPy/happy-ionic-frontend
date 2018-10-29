import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { IonicStorageModule } from "@ionic/storage";
import { IonicErrorHandler, IonicModule, NavController } from "ionic-angular";
import { MyApp } from "../../app/app.component";
import { Api, User, Utils } from "../../providers";
import { PasswordResetPage } from "./password-reset";

describe("PasswordResetPage", () => {
    let component: PasswordResetPage;
    let fixture: ComponentFixture<PasswordResetPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, PasswordResetPage],
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
        fixture = TestBed.createComponent(PasswordResetPage);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("Should create the picture page", async(() => {
        expect(component).toBeTruthy();
    }));
});
