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
import { Api, User, Utils } from "../../providers";
import { StatsPage } from "../stats/stats";
import { WelcomePage } from "../welcome/welcome";

describe("StatsPage", () => {
    let component: any;
    let fixture: ComponentFixture<any>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, StatsPage],
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
                User,
                Utils,
                // Keep this to enable Ionic's runtime error handling during development
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatsPage);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("Should create the stat page", async(() => {
        expect(component).toBeTruthy();
    }));
});
