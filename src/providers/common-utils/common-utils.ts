import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';
//import {Crop} from 'ionic-native';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { ToastController } from 'ionic-angular';

@Injectable()
export class CommonUtilsProvider {
  constructor(public toastCtrl: ToastController, public camera: Camera, public transfer: Transfer, public file: File, public filePath: FilePath) {
    console.log('Hello CommonUtilsProvider Provider');
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

