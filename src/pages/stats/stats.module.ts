import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatsPage } from './stats';

import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    StatsPage,
  ],
  imports: [
    ChartsModule,
    IonicPageModule.forChild(StatsPage),
  ],
})
export class StatsPageModule {}
