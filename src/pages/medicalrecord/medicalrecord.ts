import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IonicPage, NavParams, AlertController, NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

//import { Camera, Crop } from 'ionic-native';
//import { Camera, CameraOptions } from 'ionic-native';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

import { SocialSharing } from '@ionic-native/social-sharing';

//import { Crop } from '@ionic-native/crop'

import { DomSanitizer } from '@angular/platform-browser';

declare var cordova: any;

/**
 * Generated class for the ChecklistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-medicalrecord',
  templateUrl: 'medicalrecord.html',
})
export class MedicalRecordPage {
  selectedCategory: any;

  lastImage: string = null;
  loading: Loading;
  viewMode:string;

  //photoTaken:false;

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, private sanitizer: DomSanitizer, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, private socialSharing: SocialSharing) {

    console.log("medicalrecord page constructor");
    this.selectedCategory = this.navParams.get('category');
    this.viewMode = 'cards';
  }




  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Select from Album',
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
          text: 'Dummy',
          handler: () => {
            //this.takePicture(this.camera.PictureSourceType.CAMERA);
            this.selectedCategory.record.addItem({ notes: '', photo: 'assets/images/doctor.png' });
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

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 70,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
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
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
      
      console.log('Save to:' + correctPath + currentName);
      this.selectedCategory.record.addItem({ notes: '', photo: correctPath + currentName });

    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }


  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  addItem(): void {
    this.presentActionSheet();
    console.log("Taking picture");

  }
  addItemOld(imageData): void {
    let prompt = this.alertCtrl.create({
      title: 'Describe the photo',
      message: 'Notes:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.selectedCategory.record.addItem(data.name, imageData);
          }
        }
      ]
    });
    prompt.present();

  }


  toggleItem(item): void {

  }

  removeItem(item): void {
    this.selectedCategory.toggleItem(item);

  }


  

  updateNote(item): void {

    let prompt = this.alertCtrl.create({
      title: 'Add notes',
      message: 'Enter notes below:',
      inputs: [
        {
          name: 'notes',
          placeholder: item.notes

        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.selectedCategory.record.updateNote(item, data.notes);
          }
        }
      ]
    });
    prompt.present();

  }

  uncheckItems(): void {
    this.selectedCategory.items.foreach((item) => {
      if (item.checked) {
        this.selectedCategory.toggleItem(item);
      }
    })
  }


  socialShare(item): void {

    let options = {
      message: 'Record attached, image taken on ' +
      item.date + '\n\nNotes:\n' + item.notes,
      subject: 'MedFolio Image',
      files: [item.photo], //the paramater
      chooserTitle: 'Share via...'
    };

    this.socialSharing.shareWithOptions(options).then(() => {
      // Success!
      this.presentToast('Success sharing');
    }).catch(() => {
      this.presentToast('Error while sharing image.');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicalRecordPage');
  }

}
