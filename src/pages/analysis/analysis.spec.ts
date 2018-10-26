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
    let component: AnalysisPage;
    let fixture: ComponentFixture<AnalysisPage>;

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

    it("Should build a sorted array of exactly 8 emotion values in following order: sadness, anger, disgust, fear, contempt, neutral, surprise, happiness", () => {
        const emotions: IEmotion = {
            anger: 10,
            contempt: 20,
            disgust: 30,
            fear: 40,
            happiness: 50,
            neutral: 60,
            sadness: 70,
            smile: 80,
            surprise: 90
        };

        const emotionData: number[] = component.sortedEmotionsArray(emotions);

        expect(emotionData.length).toBe(8);

        const sadness: number = emotions.sadness;
        const anger: number = emotions.anger;
        const disgust: number = emotions.disgust;
        const fear: number = emotions.fear;
        const contempt: number = emotions.contempt;
        const neutral: number = emotions.neutral;
        const surprise: number = emotions.surprise;
        const happiness: number = emotions.happiness;

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
