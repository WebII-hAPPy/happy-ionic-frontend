import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Storage } from "@ionic/storage";
import { Face, Api } from '../../providers';

declare let cordova: any;

@IonicPage()
@Component({
  selector: 'page-picture',
  templateUrl: 'picture.html',
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
    private api: Api) {
  }

  cardImage: string = "./assets/img/women_being_analyse_compressed.png";
  base64Image: String;
  lastImage: string = null;
  loading: Loading;


  /**
   * Removes the current cardImage and changes it to the default one.
   * TODO: Delete local file? Endpoint file?
   */
  public deleteCurrentImage(): void {
    const defaultCardImage = "./assets/img/women_being_analyse_compressed.png";
    this.changeCardImage(defaultCardImage);
  }

  /**
   * Presents an action sheet to choose between the picture source type.
   */
  public presentActionSheet(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
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
      cameraDirection: 0
    };

    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));

            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);

        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  /**
   * Takes a file path as input and stores it on the persistent device storage by moving it from the /cache to /data.
   * @param namePath Path to the image
   * @param currentName Current name of the image
   * @param newFileName New name of the image
   */
  private copyFileToLocalDir(namePath: string, currentName: string, newFileName: string): void {
    this.file.moveFile(namePath, currentName, cordova.file.externalDataDirectory, newFileName)
      .then(success => {
        this.changeCardImage(this.pathForImage(newFileName));
        this.uploadImage(this.pathForImage(newFileName));
      }, err => {
        this.presentToast('Error while storing file.');
      });
  }

  /**
   * Uploads the specified image to the backend and displays an upload loading controller.
   * @param targetPath Path to the image file.
   */
  private uploadImage(targetPath: string): void {

    const url: string = 'https://backend.happy-service.ml/api/';
    const filename: string = this.lastImage;

    this.storage.get('jwt_token').then((val) => {
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
        params: { 'fileName': filename }
      };

      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });
      this.loading.present();
      fileTransfer.upload(targetPath, url + 'image', options).then((data) => {
        this.loading.dismissAll();

        console.log(data)
        let resp = JSON.parse(data.response);
        console.log(resp);

        this.api.get('api/analysis/' + resp.data.analysisId, null, { headers: { authorization: jwt_token } }).subscribe((analysisData) => {
          this.presentToast('Image succesfully uploaded. Analysis complete!');
          this.face.parseAnalysis(analysisData);
          this.navCtrl.push('AnalysisPage');
        });
      }, err => {
        console.log(err);
        this.loading.dismissAll();
        if (err.http_status === 401) {
          this.presentToast('You are not logged in...');
          this.navCtrl.push('WelcomePage');
        } else if (err.http_status === 413) {
          this.presentToast('Error: Your file is too big.')
        } else if (err.http_status === 416) {
          this.presentToast('Sorry we couldn\'t find a face on your picture...');
        } else if (err.http_status === 500) {
          this.presentToast('We have an error on our site. Please contact the developer via the about page.');
        } else {
          this.presentToast('Error while uploading file.');
        }
      });
    });
  }

  /**
   * Get a path to the external data directory.
   * @param img Name of the image
   */
  private pathForImage(img: string): string {
    if (img === null) {
      return '';
    } else {
      return (cordova.file.externalDataDirectory + img).replace(/^file:\/\//, '');
    }
  }

  /**
   * Show a message with a toast.
   * @param text Message
   */
  private presentToast(text: string): void {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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