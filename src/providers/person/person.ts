import { Injectable } from '@angular/core';

import { IPerson } from '../../models/person';
import { IEmotion } from '../../models/emotion';
import { IFacialhair } from '../../models/facialhair';
import { EGlasses } from '../../models/glasses';

@Injectable()
export class Person {
    person: IPerson;

    /**
   * Parses the response of the Picture Analysis.
   * @param res Response of the Analysis Endpoint.
   */
    public parseAnalysis(res: string): void {

        const analysis: any = JSON.parse(res);
        console.log(analysis);
        let emotion: IEmotion = analysis.data.emotion;
        const facialhair: IFacialhair = analysis.data.facialHair;
        const glassType: EGlasses = analysis.data.glasses;
        let gender: string = analysis.data.gender;
        let age: number = analysis.data.age;

        let person: IPerson;
        person.age = age;
        person.gender = gender;
        person.facialhair = facialhair;
        person.glasses = glassType;
        person.emotion = emotion;

        this.person = person;
    }

    public getPerson(): IPerson {
        return this.person;
    }

    public setPerson(person: IPerson): void {
        this.person = person;
    }
}