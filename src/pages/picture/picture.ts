import { Component } from "@angular/core";
import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { Storage } from "@ionic/storage";
import {
    ActionSheetController,
    IonicPage,
    Loading,
    LoadingController,
    NavController,
    NavParams,
    Platform,
    ToastController
} from "ionic-angular";
import { Api, Face, Utils } from "../../providers";
import { BackButtonOverwrite } from "../../providers/backButton/backButton";
import {
    global_401Error,
    global_500Error,
    global_apiUrl,
    picture_fileNotAllowed,
    picture_fileSelectError,
    picture_fileStoredError,
    picture_fileTooBigError,
    picture_fileUploadError,
    picture_noFaceFoundError,
    picture_uploadSuccess,
    picture_userNotFoundError
} from "../../providers/utils/strings";

declare let cordova: any;

@IonicPage()
@Component({
    selector: "page-picture",
    templateUrl: "picture.html"
})
export class PicturePage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private camera: Camera,
        private transfer: Transfer,
        private file: File,
        private filePath: FilePath,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        private storage: Storage,
        private face: Face,
        private api: Api,
        private utils: Utils
    ) {
        this.exitCounter = 0;
        const overwrite: BackButtonOverwrite = new BackButtonOverwrite(
            this.platform,
            this.navCtrl,
            this.toastCtrl
        );
        overwrite.overwriteBackButtonPop();
    }

    cardImage: string = "./assets/img/women_being_analyse_compressed.png";
    base64Image: String;
    lastImage: string = null;
    loading: Loading;

    exitCounter: number;

    /**
     * Removes the current cardImage and changes it to the default one.
     */
    public deleteCurrentImage(): void {
        const defaultCardImage =
            "./assets/img/women_being_analyse_compressed.png";
        this.changeCardImage(defaultCardImage);
    }

    /**
     * Presents an action sheet to choose between the picture source type.
     */
    public presentActionSheet(): void {
        let actionSheet = this.actionSheetCtrl.create({
            title: "Select Image Source",
            buttons: [
                {
                    text: "Load from Library",
                    handler: () => {
                        this.takePicture(
                            this.camera.PictureSourceType.PHOTOLIBRARY
                        );
                    }
                },
                {
                    text: "Use Camera",
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel"
                }
            ]
        });
        actionSheet.present();
    }

    /**
     * Gets a picture from the desired source and stores it to persistend memory.
     * @param sourceType Source type of the image: This is for instance camera.PictureSourceType.CAMERA or .PHOTOLIBRARY
     */
    public takePicture(sourceType: number): void {
        let options = {
            quality: 60,
            sourceType: sourceType,
            saveToPhotoAlbum: true,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.FILE_URI,
            cameraDirection: 1
        };

        this.camera.getPicture(options).then(
            imagePath => {
                // Special handling for Android library
                if (
                    this.platform.is("android") &&
                    sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
                ) {
                    
                    this.filePath
                        .resolveNativePath(imagePath)
                        .then(filePath => {
                            let correctPath = filePath.substr(
                                0,
                                filePath.lastIndexOf("/") + 1
                            );
                            let currentName = imagePath.substring(
                                imagePath.lastIndexOf("/") + 1,
                                imagePath.lastIndexOf("?")
                            );
                            
                            this.copyFileToLocalDir(
                                correctPath,
                                currentName,
                                this.createFileName()
                            );
                        });
                } else {
                    let currentName = imagePath.substr(
                        imagePath.lastIndexOf("/") + 1
                    );
                    let correctPath = imagePath.substr(
                        0,
                        imagePath.lastIndexOf("/") + 1
                    );
                    
                    this.copyFileToLocalDir(
                        correctPath,
                        currentName,
                        this.createFileName()
                    );
                }
            },
            err => {
                this.utils.presentToast(picture_fileSelectError);
            }
        );
    }

    /**
     * Takes a file path as input and stores it on the persistent device storage by moving it from the /cache to /data.
     * @param namePath Path to the image
     * @param currentName Current name of the image
     * @param newFileName New name of the image
     */
    private copyFileToLocalDir(
        namePath: string,
        currentName: string,
        newFileName: string
    ): void {
        let directory: string;

        if (this.platform.is("ios") || this.platform.is("ipad")) {
            directory = cordova.file.dataDirectory;
        } else {
            directory = cordova.file.externalDataDirectory;
        }

        this.file
            .moveFile(
                namePath,
                currentName,
                directory,
                newFileName
            )
            .then(
                success => {
                    this.changeCardImage(this.pathForImage(newFileName));
                    this.uploadImage(this.pathForImage(newFileName));
                },
                err => {
                    this.utils.presentToast(picture_fileStoredError);
                }
            );
    }

    /**
     * Uploads the specified image to the backend and displays an upload loading controller.
     * @param targetPath Path to the image file.
     */
    private uploadImage(targetPath: string): void {
        const filename: string = this.lastImage;

        this.storage.get("jwt_token").then(val => {
            const jwt_token = val;
            const fileTransfer: TransferObject = this.transfer.create();
            const options = {
                headers: {
                    authorization: jwt_token
                },
                fileKey: "image",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: { fileName: filename }
            };

            this.loading = this.loadingCtrl.create({
                content: "Uploading..."
            });
            this.loading.present();
            fileTransfer
                .upload(targetPath, global_apiUrl + "image", options)
                .then(
                    data => {
                        this.loading.dismissAll();
                        let resp = JSON.parse(data.response);

                        this.api
                            .get("api/analysis/" + resp.data.analysisId, null, {
                                headers: { authorization: jwt_token }
                            })
                            .subscribe(analysisData => {
                                this.utils.presentToast(picture_uploadSuccess);
                                this.face.parseAnalysis(analysisData);
                                this.navCtrl.push("AnalysisPage");
                            });
                    },
                    err => {
                        this.loading.dismissAll();
                        if (err.http_status === 401) {
                            this.utils.presentToast(global_401Error);
                            this.utils.navigateToNewRoot("WelcomePage");
                        } else if (err.http_status === 404) {
                            this.utils.presentToast(picture_userNotFoundError);
                            this.storage.clear();
                            this.utils.navigateToNewRoot("WelcomePage");
                        } else if (err.http_status === 406) {
                            this.utils.presentToast(picture_noFaceFoundError);
                        } else if (err.http_status === 413) {
                            this.utils.presentToast(picture_fileTooBigError);
                        } else if (err.http.status === 415) {
                            this.utils.presentToast(picture_fileNotAllowed);
                        } else if (err.http_status === 500) {
                            this.utils.presentToast(global_500Error);
                        } else if (err.http_status === 502) {
                            this.utils.presentToast(global_500Error);
                        } else {
                            this.utils.presentToast(picture_fileUploadError);
                        }
                    }
                );
        });
    }

    /**
     * Get a path to the external data directory.
     * @param img Name of the image
     */
    private pathForImage(img: string): string {
        if (img === null) {
            return "";
        } else if (this.platform.is("ios") || this.platform.is("ipad")) {
            return (cordova.file.dataDirectory + img).replace(/^file:\/\//, "");
        } else {
            return (cordova.file.externalDataDirectory + img).replace(/^file:\/\//, "");
        }
    }

    /**
     * Change the card image
     * @param targetPath image path
     */
    private changeCardImage(targetPath: string): void {
        this.cardImage = targetPath;
    }

    /**
     * Create a new file name with the time in millisecons + .jpg
     */
    private createFileName(): string {
        let d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
        return newFileName;
    }
}
