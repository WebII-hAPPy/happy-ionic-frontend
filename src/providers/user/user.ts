import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { IUser } from '../../models/user';
import { IAccountInfo } from '../../models/accountinfo';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Storage } from "@ionic/storage";


@Injectable()
export class User {
  _user: IUser;

  constructor(public api: Api, private storage: Storage) { }

  /**
   * Send a POST request to the login endpoint with the data
   * the user entered on the form.
   * @param accountInfo Object with IAccountInfo to be loged in.
   */
  login(accountInfo: IAccountInfo): Observable<ArrayBuffer> {
    let seq: Observable<ArrayBuffer> = this.api.post('login', accountInfo).pipe(share());

    seq.subscribe((res: any) => {
      this._loggedIn(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to the registration endpoint with the data
   * the user entered on the form.
   * @param accountInfo Object with IAccountInfo to be registered.
   */
  register(accountInfo: IAccountInfo): Observable<ArrayBuffer> {
    let seq: Observable<ArrayBuffer> = this.api.post('register', accountInfo).pipe(share());

    seq.subscribe((res: any) => {
      if (res.status === '201') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

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
    this._user.token = resp.data.token;
    this.storage.set('jwt_token', resp.data.token);
  }

  /**
   * Returns the cached user object.
   * TODO: What if the user is null?
   */
  getUser(): IUser {
    return this._user;
  }
}
