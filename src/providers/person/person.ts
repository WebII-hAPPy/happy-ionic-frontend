import { Injectable } from '@angular/core';

import { IPerson } from '../../models/person';
import { IEmotion } from '../../models/emotion';
import { IFacialhair } from '../../models/facialhair';
import { EGlasses } from '../../models/glasses';

@Injectable()
export class Person {
    private _person: IPerson;

    /**
   * Parses the response of the Picture Analysis.
   * @param res Response of the Analysis Endpoint.
   */
    public parseAnalysis(res: string): void {

        const analysis: any = JSON.parse(res);

        console.log(analysis);

        let emotion: IEmotion = analysis.data.emotion;
        console.log(emotion);
        const facialhair: IFacialhair = analysis.data.facialHair;
        const glasses: EGlasses = analysis.data.glasses;
        let gender: string = analysis.data.gender;
        let age: number = analysis.data.age;

        this._person = {
            emotion,
            facialhair,
            glasses,
            gender,
            age
        }
    }

    public getPerson(): IPerson {
        return this._person;
    }

    public setPerson(person: IPerson): void {
        this._person = person;
    }
}