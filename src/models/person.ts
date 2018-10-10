import { IFacialhair } from "./facialhair";
import { EGlasses } from "./glasses";
import { IEmotion } from "./emotion";

export interface IPerson {
    facialhair: IFacialhair,
    gender: string,
    age: number,
    glasses: EGlasses,
    emotion: IEmotion,
}