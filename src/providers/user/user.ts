import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/toPromise";
import { Observable } from "rxjs/Observable";
import { share } from "rxjs/operators";
import { IAccountInfo } from "../../models/accountinfo";
import { IUser } from "../../models/user";
import { Api } from "../api/api";

@Injectable()
export class User {
    _user: IUser;

    constructor(public api: Api, private storage: Storage) {}

    /**
     * Send a POST request to the login endpoint with the data
     * the user entered on the form.
     * @param accountInfo Object with IAccountInfo to be loged in.
     */
    login(accountInfo: IAccountInfo): Observable<ArrayBuffer> {
        let seq: Observable<ArrayBuffer> = this.api
            .post("login", accountInfo)
            .pipe(share());

        seq.subscribe(
            (res: any) => {
                if (res.data.user) {
                    this._loggedIn(res);
                }
            },
            err => {
                console.error("ERROR", err);
            }
        );

        return seq;
    }

    /**
     * Send a POST request to the registration endpoint with the data
     * the user entered on the form.
     * @param accountInfo Object with IAccountInfo to be registered.
     */
    register(accountInfo: IAccountInfo): Observable<ArrayBuffer> {
        let seq: Observable<ArrayBuffer> = this.api
            .post("register", accountInfo)
            .pipe(share());

        seq.subscribe(
            (res: any) => {
                if (res.status === "201") {
                    this._loggedIn(res);
                }
            },
            err => {
                console.error("ERROR ", err);
            }
        );

        return seq;
    }

    /**
     * Send a PUT request to the update password endpoint with the new
     * password
     * @param password new password
     */
    async resetPassword(password: string): Promise<Observable<ArrayBuffer>> {
        const jwt_token = await this.storage.get("jwt_token");
        const data = {
            password: password
        };
        const seq: Observable<ArrayBuffer> = this.api
            .put("api/updatePassword", data, {
                headers: { authorization: jwt_token }
            })
            .pipe(share());

        seq.subscribe(
            (res: any) => {
                if (res.status === "200") {
                    this._loggedIn(res);
                }
            },
            err => {
                console.error("ERROR ", err);
            }
        );
        return seq;
    }

    /**
     * Destroys the user object and clears the database.
     */
    logout(): void {
        this._user = null;
        this.storage.clear();
    }

    /**
     * Stores the values of the response to the local user object and stores the jwt token.
     */
    _loggedIn(resp): void {
        this._user = resp.data.user;
        this.storage.set("jwt_token", resp.data.token);
    }

    /**
     * Returns the cached user object.
     */
    getUser(): IUser {
        return this._user;
    }

    /**
     * Caches the user.
     * @param data Sets
     */
    setUser(data): void {
        this._user = data;
    }

    /**
     * synchronizes name change with model
     * @param name new name
     */
    setUserName(name: string): void {
        this._user.name = name;
    }
}
