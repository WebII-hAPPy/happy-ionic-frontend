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
import { ChartsModule } from "ng2-charts";
import { MyApp } from "../../app/app.component";
import { IEmotion } from "../../models/emotion";
import { Api, Face, User, Utils } from "../../providers";
import { AnalysisPage } from "../analysis/analysis";
import { WelcomePage } from "../welcome/welcome";

describe("AnalysisPage", () => {
    let component: any;
    let fixture: ComponentFixture<any>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, AnalysisPage],
            imports: [
                BrowserModule,
                HttpClientModule,
                ChartsModule,
                IonicModule.forRoot(MyApp, { preloadModules: true }),
                IonicStorageModule.forRoot()
            ],
            providers: [
                NavController,
                { provide: NavParams, useClass: WelcomePage },
                Api,
                User,
                Face,
                Utils,
                // Keep this to enable Ionic's runtime error handling during development
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnalysisPage);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("Should create the analysis page", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Should build a sorted array of exactly 8 emotion values in following order: sadness, anger, disgust, fear, contempt, neutral, surprise, happiness and to be multiplied be 100 to show percentages", () => {
        const emotions: IEmotion = {
            anger: 0.1,
            contempt: 0.2,
            disgust: 0.3,
            fear: 0.4,
            happiness: 0.5,
            neutral: 0.6,
            sadness: 0.7,
            smile: 0.8,
            surprise: 0.9
        };

        const emotionData: number[] = component.sortedEmotionsArray(emotions);

        expect(emotionData.length).toBe(8);

        const multiplier: number = 100;

        const sadness: number = emotions.sadness * multiplier;
        const anger: number = emotions.anger * multiplier;
        const disgust: number = emotions.disgust * multiplier;
        const fear: number = emotions.fear * multiplier;
        const contempt: number = emotions.contempt * multiplier;
        const neutral: number = emotions.neutral * multiplier;
        const surprise: number = emotions.surprise * multiplier;
        const happiness: number = emotions.happiness * multiplier;

        expect(emotionData[0]).toBe(sadness);
        expect(emotionData[1]).toBe(anger);
        expect(emotionData[2]).toBe(disgust);
        expect(emotionData[3]).toBe(fear);
        expect(emotionData[4]).toBe(contempt);
        expect(emotionData[5]).toBe(neutral);
        expect(emotionData[6]).toBe(surprise);
        expect(emotionData[7]).toBe(happiness);
    });

    it("Should built chart when data is loaded", () => {
        spyOn(component, "buildDoughnutChart");

        component.ionViewDidEnter();

        expect(component.buildDoughnutChart).toHaveBeenCalled();
    });
});
