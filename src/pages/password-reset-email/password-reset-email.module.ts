import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PasswordResetEmailPage } from "./password-reset-email";

@NgModule({
    declarations: [PasswordResetEmailPage],
    imports: [IonicPageModule.forChild(PasswordResetEmailPage)],
    exports: [PasswordResetEmailPage]
})
export class PasswordResetEmailPageModule {}
