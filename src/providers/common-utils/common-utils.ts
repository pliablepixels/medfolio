import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';
//import {Crop} from 'ionic-native';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class CommonUtilsProvider {

  loader:any;

  constructor(public toastCtrl: ToastController, public camera: Camera, public transfer: FileTransfer, public file: File, public filePath: FilePath, public loadingCtrl: LoadingController) {
    console.log('Hello CommonUtilsProvider Provider');
    //this.loader = loadingCtrl.create();
  }

  // pass -1 to dur for infinite
  presentLoader(text, dur=6000) {

    if (this.loader) {this.loader.dismiss();}
    this.loader = this.loadingCtrl.create ({
      content:text,
      duration:dur
    });
    this.loader.present();
  }

  removerLoader() {
    if (this.loader) {this.loader.dismiss();}
  }

  // wrapper to present a toast with different colors
  // error = red
  // any other val = green
  presentToast(text, type?, dur?) {

    var cssClass = 'successToast';
    if (type == 'error') cssClass = 'errorToast';

    let toast = this.toastCtrl.create({
      message: text,
      duration: dur || 1800,
      position: 'top',
      cssClass: cssClass
    });
    toast.present();
  }


  // Create a new name for the image
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // converts image name to full path name+image so we
  // can render it
  getFullPath(img) {
    if (img === null) {
      return '';
    } else {
      // hack for dummy
      if (img.indexOf('doctor.png') > -1) {
        return img;
      }
      else {
        return this.file.dataDirectory + img;
      }

    }
  }

}

