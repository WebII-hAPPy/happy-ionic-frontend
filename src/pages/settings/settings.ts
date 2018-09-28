import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Settings, User } from '../../providers';
import { WelcomePage } from '../welcome/welcome';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // TODO: Think about subsettings
  options: any;

  settingsReady = false;

  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'Profile'
  };

  page: string = 'main';
  pageTitleKey: string = 'Settings';
  pageTitle: string;

  subSettings: any = SettingsPage;

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public user: User) {
  }

  /**
   * Builds the form by grouping the options.
   */
  _buildForm(): void {
    let group: any = {
      name: [this.options.name]
    };

    switch (this.page) {
      case 'main':
        break;
      case 'profile':
        group = {
          option4: [this.options.option4]
        };
        break;
    }
    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.settings.merge(this.form.value);
    });
  }

  /**
   * Build an empty form for the template to render
   */
  ionViewDidLoad(): void {
    this.form = this.formBuilder.group({});
  }

  /**
   * Build an empty form for the template to render
   */
  ionViewWillEnter(): void {
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });
  }

  /**
   * Logs the user out and displays the welcome page.
   */
  logout(): void {
    this.user.logout();
    this.navCtrl.push(WelcomePage);
  }
}
