import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';

import { FirstRunPage, MainPage } from '../pages';
import { Api, User } from '../providers';
import { Storage } from "@ionic/storage";

@Component({
  template: `<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage;

  constructor(platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private api: Api,
    private user: User) {

    platform.ready().then(() => {
      this.storage.get('jwt_token').then((value) => {
        if (value != null) {
          this.api.get('verifyToken', null, { headers: { authorization: value } }).subscribe((res) => {
            console.log(res);
            this.rootPage = MainPage;
            this._saveUser(res);
          }, (err) => {
            this.rootPage = FirstRunPage;
            console.log(err);
          }, () => {
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
          });
        } else {
          this.rootPage = FirstRunPage;
          this.statusBar.styleLightContent();
          this.splashScreen.hide();
        }
      });
    });
  }

  /**
   * Chaches the user object.
   * TODO: interface for data
   * @param res 
   */
  private _saveUser(res: any): void {
    this.user.setUser(res.data);
  }
}
