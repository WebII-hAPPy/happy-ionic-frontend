import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform, AlertController } from 'ionic-angular';

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
    private user: User,
    private alertController: AlertController) {

    platform.ready().then(() => {
      if (platform.is('ios') || platform.is('ipad')) {
        this.statusBar.styleDefault();
      } else {
        this.statusBar.styleLightContent();
      }

      this.storage.get('jwt_token').then((value) => {
        if (value != null) {
          this.api.get('api/verifyToken', null, { headers: { authorization: value } }).subscribe((res: any) => {
            this.rootPage = MainPage;
            this.user.setUser(res.data);
          }, (err) => {
            this.storage.get('firstAppRun').then((resp) => {
              if (resp === null) {
                if (platform.is('ios')) {
                  let alert = this.alertController.create({
                    title: "Data Protection",
                    message: "By clickling Confirm you agree that we are allowed to process your data. For more details take a look at our about page.",
                    buttons: [
                      {
                        text: "Confirm",
                        handler: () => {
                          this.storage.set('firstAppRun', "False");
                        }
                      }
                    ],
                    enableBackdropDismiss: false
                  });
                  alert.present();
                }
              } else {
                let alert = this.alertController.create({
                  title: "Data Protection",
                  message: "By clickling Confirm you agree that we are allowed to process your data. For more details take a look at our about page.",
                  buttons: [
                    {
                      text: "Confirm",
                      handler: () => {
                        this.storage.set('firstAppRun', "False");
                      }
                    }, {
                      text: "Cancel",
                      handler: () => {
                        platform.exitApp();
                      }
                    }
                  ],
                  enableBackdropDismiss: false
                });
                alert.present();
              }
            });
            this.rootPage = FirstRunPage;
          }, () => {
            this.splashScreen.hide();
          });
        } else {
          this.storage.get('firstAppRun').then((resp) => {
            if (resp === null) {
              this.storage.get('firstAppRun').then((resp) => {
                if (resp === null) {
                  if (platform.is('ios')) {
                    let alert = this.alertController.create({
                      title: "Data Protection",
                      message: "By clickling Confirm you agree that we are allowed to process your data. For more details take a look at our about page.",
                      buttons: [
                        {
                          text: "Confirm",
                          handler: () => {
                            this.storage.set('firstAppRun', "False");
                          }
                        }
                      ],
                      enableBackdropDismiss: false
                    });
                    alert.present();
                  }
                } else {
                  let alert = this.alertController.create({
                    title: "Data Protection",
                    message: "By clickling Confirm you agree that we are allowed to process your data. For more details take a look at our about page.",
                    buttons: [
                      {
                        text: "Confirm",
                        handler: () => {
                          this.storage.set('firstAppRun', "False");
                        }
                      }, {
                        text: "Cancel",
                        handler: () => {
                          platform.exitApp();
                        }
                      }
                    ],
                    enableBackdropDismiss: false
                  });
                  alert.present();
                }
              });
            }
          });
          this.rootPage = FirstRunPage;
          this.splashScreen.hide();
        }
      });
    });
  }
}
