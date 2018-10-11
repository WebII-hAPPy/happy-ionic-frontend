import { Injectable } from '@angular/core';

import { IFace } from '../../models/face';
import { IEmotion } from '../../models/emotion';
import { IFacialhair } from '../../models/facialhair';
import { EGlasses } from '../../models/glasses';

@Injectable()
export class Face {
    private _person: IFace;

    /**
   * Parses the response of the Picture Analysis.
   * @param res Response of the Analysis Endpoint.
   */
    public parseAnalysis(res: any): void {

        const analysis: any = res.data;

        let emotion: IEmotion = analysis.emotion;
        const facialhair: IFacialhair = analysis.facialHair;
        const glasses: EGlasses = analysis.glasses;
        let gender: string = analysis.gender;
        let age: number = analysis.age;

        this._person = {
            emotion,
            facialhair,
            glasses,
            gender,
            age
        }
    }

    public getPerson(): IFace {
        return this._person;
    }

    public setPerson(person: IFace): void {
        this._person = person;
    }
}