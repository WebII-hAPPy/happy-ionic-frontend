import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

/**
 * Checks if the password from form are identical
 */
export class CustomFormValidator {
    static validatePasswords(form: FormGroup): any {
        const password = form.controls.password.value;
        const confirmPassword = form.controls.confirmPassword.value;

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

    static validateRegister(form: FormGroup): any {
        const email = form.controls.email.value;

        if (/^.+@.+$/.test(email)) {
            return null;
        }

        return {
            doesMatchPassword: true
        };
    }

    static validateEmail(nameRe: RegExp): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const valid = nameRe.test(control.value);
            return valid ? null : { valid: { value: control.value } };
        };
    }
}
