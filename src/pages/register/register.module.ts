import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { RegisterPage } from './register';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RegisterPage
  ]
})
export class RegisterPageModule { }
