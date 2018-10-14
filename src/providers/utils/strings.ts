import { Injectable } from '@angular/core';

@Injectable()
export class Strings {

    constructor() { }

    public global_500Error: string = 'We have an error on our site. Please contact the developer via the information provided in the about page.';
    public global_401Error: string = 'You are not logged in...';

    public login_loginErrorString: string = "Unable to sign in. Please check your account information and try again.";

    public picture_apiUrl: string = 'https://backend.happy-service.ml/api/';
    public picture_uploadSuccess: string = 'Image succesfully uploaded. Analysis complete!';
    public picture_fileStoredError: string = 'Error while storing file.';
    public picture_fileSelectError: string = 'Error while selecting image.';
    public picture_fileTooBigError: string = 'Error: Your file is too big.';
    public picture_fileUploadError: string = 'Error while uploading file.';
    public picture_noFaceFoundError: string = 'Sorry we couldn\'t find a face on your picture...';

    public register_registerErrorString: string = "Unable to create account. Please check your account information and try again.";
    public register_verificationMailString: string = "Hi! The hAPPy team send you a verification mail. Please also check your spam folder. Keep smiling!"
    public register_autoLoginErrorString: string = "Sorry we couldn\'t log you in... Please try again."

    public settings_accountDeleted: string = 'Your account was successfully deleted.';
    public settings_accountDeletedError: string = 'Could not delete your account.';
}