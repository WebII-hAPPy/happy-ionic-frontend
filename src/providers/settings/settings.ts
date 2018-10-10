import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class Settings {
  private SETTINGS_KEY: string = '_settings';

  settings: any;

  _defaults: any;
  _readyPromise: Promise<any>;

  constructor(public storage: Storage, defaults: any) {
    this._defaults = defaults;
  }

  /**
   * Loads stored settings from persistend memory.
   */
  load(): Promise<any> {
    return this.storage.get(this.SETTINGS_KEY).then((value) => {
      if (value) {
        this.settings = value;
        return this._mergeDefaults(this._defaults);
      } else {
        return this.setAll(this._defaults).then((val) => {
          this.settings = val;
        })
      }
    });
  }

  /**
   * Merges default settings to stored settings.
   * @param defaults key:value settings object.
   */
  _mergeDefaults(defaults: any): Promise<any> {
    for (let k in defaults) {
      if (!(k in this.settings)) {
        this.settings[k] = defaults[k];
      }
    }
    return this.setAll(this.settings);
  }

  /**
   * Merges new settings with old settings by only overriding settings which are given to the function.
   * @param settings Object with key:value based settings
   */
  merge(settings: any): Promise<any> {
    for (let k in settings) {
      this.settings[k] = settings[k];
    }
    return this.save();
  }

  /**
   * Persistently stores one key:value pair by adding it to the settings object and saving the object.
   * @param key Name of the key
   * @param value Any value
   */
  setValue(key: string, value: any): Promise<any> {
    this.settings[key] = value;
    return this.storage.set(this.SETTINGS_KEY, this.settings);
  }

  /**
   * Persistently stores a value under the key this.SETTINGS_KEY.
   * @param value Value to be stored.
   */
  setAll(value: any): Promise<any> {
    return this.storage.set(this.SETTINGS_KEY, value);
  }

  /**
   * Retrieves the settings object by using the this.SETTINGS_KEY from the persistend memory.
   * Then it returns the value to the given key of the settings object. 
   * @param key Name of the key from the desired key:value pair of the settings object.
   */
  getValue(key: string): any {
    return this.storage.get(this.SETTINGS_KEY)
      .then(settings => {
        return settings[key];
      });
  }

  /**
   * Persistently stores the settings object.
   */
  save(): Promise<any> {
    return this.setAll(this.settings);
  }

  /**
   * Returns the settings object
   */
  get allSettings(): any {
    return this.settings;
  }
}
