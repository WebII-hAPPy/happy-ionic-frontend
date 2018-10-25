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
          this.api.get('api/verifyToken', null, { headers: { authorization: value } }).subscribe((res: any) => {
            this.rootPage = MainPage;
            this.user.setUser(res.data);
          }, (err) => {
            this.rootPage = FirstRunPage;
          }, () => {
            if (platform.is('ios') || platform.is('ipad')) {
              this.statusBar.styleDefault();
            } else {
              this.statusBar.styleLightContent();
            }
            this.splashScreen.hide();
          });
        } else {
          this.rootPage = FirstRunPage;
          if (platform.is('ios') || platform.is('ipad')) {
            this.statusBar.backgroundColorByHexString('#000000');
          } else {
            this.statusBar.styleLightContent();
          }
          this.splashScreen.hide();
        }
      });
    });
  }
}
