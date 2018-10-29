import { FormGroup, ValidatorFn, AbstractControl } from "@angular/forms";

/**
 * Checks if the password from form are identical
 */
export class CustomFormValidator {
    constructor() {}

    static validatePasswords(form: FormGroup): any {
        const password = form.controls.password.value;
        const confirmPassword = form.controls.confirmPassword.value;

        if (password.length < 8) {
            return {
                passwordToShort: {
                    value: form.controls.password.value
                }
            };
        }

        if (confirmPassword !== password) {
            return {
                passwordDoNotMatch: {
                    value: form.controls.password.value
                }
            };
        }

        return null;
    }

    /**
     * Checks if input matches email regex
     */
    static validateEmail(form?: FormGroup): any {
        const valid = /^.+@.+$/.test(form.controls.email.value);
        return valid
            ? null
            : { emailInvalid: { value: form.controls.email.value } };
    }

    /**
     * Checks if input matches email regex
     * @param nameRe regex for email
     */
    static email(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const invalid = /^.+@.+$/.test(control.value);
            return invalid ? null : { emailInvalid: { value: control.value } };
        };
    }
}
