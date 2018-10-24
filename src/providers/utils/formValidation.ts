import { FormGroup } from "@angular/forms";

export class PasswordValidator {
    static validate(form: FormGroup) {
        let password = form.controls.password.value;
        let confirmPassword = form.controls.confirmPassword.value;
 
        if (confirmPassword.length <= 0) {
            return null;
        }
 
        if (confirmPassword !== password) {
            return {
                doesMatchPassword: true
            };
        }
 
        return null;
 
    }
}