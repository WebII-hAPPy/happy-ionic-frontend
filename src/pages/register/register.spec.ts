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
import { RegisterPage } from "./register";

describe("RegisterPage", () => {
    let component: RegisterPage;
    let fixture: ComponentFixture<RegisterPage>;
    let name: DebugElement;
    let email: DebugElement;
    let password: DebugElement;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, RegisterPage],
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
                    useClass: RegisterPage
                },
                Api,
                User,
                Utils,
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
        name = null;
        email = null;
        password = null;
    });

    it("Should create the register page", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Should perform register action upon button press", () => {
        spyOn(component, "doRegister");

        fixture.detectChanges();
        name = fixture.debugElement.query(By.css("ion-input[id=name]"));
        fixture.detectChanges();
        name.nativeElement.value = "test";
        fixture.detectChanges();
        email = fixture.debugElement.query(By.css("ion-input[id=email]"));
        fixture.detectChanges();
        email.nativeElement.value = "email@email";
        fixture.detectChanges();
        password = fixture.debugElement.query(By.css("ion-input[id=password]"));
        fixture.detectChanges();
        password.nativeElement.value = "test";
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css("form"));
        de.triggerEventHandler("submit", null);

        expect(component.doRegister).toHaveBeenCalled();
    });
});
