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
import { NavMock } from "../../../test-config/mock-ionic";
import { MyApp } from "../../app/app.component";
import { TabsPage } from "../tabs/tabs";

describe("TabsPage", () => {
    let component: TabsPage;
    let fixture: ComponentFixture<TabsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, TabsPage],
            imports: [
                BrowserModule,
                HttpClientModule,
                IonicModule.forRoot(MyApp, { preloadModules: true }),
                IonicStorageModule.forRoot()
            ],
            providers: [
                { provide: NavController, useClass: NavMock },
                { provide: NavParams, useClass: TabsPage },
                // Keep this to enable Ionic's runtime error handling during development
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabsPage);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("Should create the tabs page", async(() => {
        expect(component).toBeTruthy();
    }));
});
