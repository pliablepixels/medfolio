import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';
//import {Crop} from 'ionic-native';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { ToastController } from 'ionic-angular';

@Injectable()
export class CommonUtilsProvider {
  constructor(private toastCtrl: ToastController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath) {
    console.log('Hello CommonUtilsProvider Provider');
  }

  presentToast(text, type?, dur?) {

    var cssClass = 'successToast';
    if (type == 'error') cssClass = 'errorToast';

    let toast = this.toastCtrl.create({
      message: text,
      duration: dur || 3000,
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

