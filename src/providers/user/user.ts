import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { IUser } from '../../models/user';
import { IAccountInfo } from '../../models/accountinfo';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: IUser;

  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: IAccountInfo) {
    let seq = this.api.post('login', accountInfo).share();

    seq.subscribe((res: any) => {
      if (res.status === '200') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  register(accountInfo: IAccountInfo) {
    let seq = this.api.post('registration', accountInfo).share();

    seq.subscribe((res: any) => {
      if (res.status === '200') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  logout() {
    this._user = null;
  }
  
  _loggedIn(resp) {
    this._user = resp.data.user;
    this._user.token = resp.data.token;
  }
}
