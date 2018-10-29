import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root } from '../';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: "PicturePage" = Tab1Root;
  tab2Root: "StatsPage" = Tab2Root;
  tab3Root: "SettingsPage" = Tab3Root;

  tab1Title = "Picture";
  tab2Title = "Stats";
  tab3Title = "Settings";

  constructor(public navCtrl: NavController) { }
}
