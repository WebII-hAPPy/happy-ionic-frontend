import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Transfer } from "@ionic-native/transfer";
import { IonicStorageModule } from "@ionic/storage";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { ChartsModule } from "ng2-charts";
import { Api, Face, User, Utils } from "../providers";
import { MyApp } from "./app.component";

@NgModule({
    declarations: [MyApp],
    imports: [
        BrowserModule,
        HttpClientModule,
        ChartsModule,
        IonicModule.forRoot(MyApp, { preloadModules: true }),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp],
    providers: [
        Api,
        User,
        Camera,
        Face,
        Utils,
        File,
        Transfer,
        FilePath,
        SplashScreen,
        StatusBar,
        // Keep this to enable Ionic's runtime error handling during development
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {}
