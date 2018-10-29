import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { Transfer } from "@ionic-native/transfer";
import { IonicStorageModule } from "@ionic/storage";
import {
    IonicErrorHandler,
    IonicModule,
    NavController,
    NavParams
} from "ionic-angular";
import { MyApp } from "../../app/app.component";
import { Api, Face, User, Utils } from "../../providers";
import { PicturePage } from "../picture/picture";
import { WelcomePage } from "../welcome/welcome";

describe("PicturePage", () => {
    let component: PicturePage;
    let fixture: ComponentFixture<PicturePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, PicturePage],
            imports: [
                BrowserModule,
                HttpClientModule,
                IonicModule.forRoot(MyApp, { preloadModules: true }),
                IonicStorageModule.forRoot()
            ],
            providers: [
                NavController,
                { provide: NavParams, useClass: WelcomePage },
                { provide: File, useClass: WelcomePage },
                Api,
                User,
                Camera,
                Face,
                Utils,
                Transfer,
                FilePath,
                // Keep this to enable Ionic's runtime error handling during development
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PicturePage);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("Should create the picture page", async(() => {
        expect(component).toBeTruthy();
    }));
});
