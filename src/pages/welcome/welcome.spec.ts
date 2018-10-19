import { WelcomePage } from "./welcome";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule, NavController } from "ionic-angular/";

describe("Welcome", () => {
    let component: WelcomePage;
    let fixture: ComponentFixture<WelcomePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WelcomePage],
            imports: [IonicModule.forRoot(WelcomePage)],
            providers: [NavController]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomePage);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("Should create the welcome page", async(() => {
        expect(component).toBeTruthy();
    }));
});
