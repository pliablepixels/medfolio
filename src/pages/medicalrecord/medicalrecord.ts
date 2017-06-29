import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IonicPage, NavParams, AlertController, NavController, ActionSheetController, Platform, LoadingController, Loading } from 'ionic-angular';

//import { Camera, Crop } from 'ionic-native';
//import { Camera, CameraOptions } from 'ionic-native';
import { Camera } from '@ionic-native/camera';
import {Crop} from 'ionic-native';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

import { SocialSharing } from '@ionic-native/social-sharing';

//import { Crop } from '@ionic-native/crop'

import { DomSanitizer } from '@angular/platform-browser';


import { ImageViewerController } from 'ionic-img-viewer';
import { CommonUtilsProvider } from '../../providers/common-utils/common-utils';



//declare var cordova: any;

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

   _imageViewerCtrl: ImageViewerController;

  //photoTaken:false;

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public platform: Platform, public loadingCtrl: LoadingController, private socialSharing: SocialSharing, imageViewerCtrl: ImageViewerController, private commonUtils:CommonUtilsProvider, private camera:Camera, private file:File, private filePath:FilePath) {

    console.log("medicalrecord page constructor");
    this.selectedCategory = this.navParams.get('category');
    this.viewMode = 'cards';
    this._imageViewerCtrl = imageViewerCtrl;
  }



  presentImage (myImage) {
    console.log ("PresentImage with "+myImage);
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
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

  

  

  

  

  // Always get the accurate path to your apps folder
  public getFullPath(img) {
    return this.commonUtils.getFullPath(img);
  }

  addItem(): void {
    this.presentActionSheet();
    console.log("Taking picture");

  }
 


  toggleItem(item): void {

  }

  removeItem(item): void {
    console.log ("Calling model remove");
   this.selectedCategory.record.removeItem(item)
   .then (success => {
     //this.commonUtils.presentToast('success deleting');
   }, 
   error => {
     this.commonUtils.presentToast('error deleting image');
   });
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
      this.commonUtils.presentToast('Success sharing');
    }).catch(() => {
      this.commonUtils.presentToast('Error while sharing image.', 'error');
    });
  }



   // Copy the image to a local folder
   copyFileToLocalDir(namePath, currentName, newFileName) {
    console.log ("*** persistent "+this.file.dataDirectory);
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      //this.lastImage = newFileName;
      console.log('Save to:' +  newFileName);
      this.selectedCategory.record.addItem({ notes: '', photo: newFileName });
    }, error => {
      this.commonUtils.presentToast('Error while storing file.');
    });
  }

 takePicture(sourceType) {
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

      let newFileName = this.commonUtils.createFileName();
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, newFileName);
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, newFileName);
      }
      
      

    }, (err) => {
      this.commonUtils.presentToast('Error while selecting image.', 'error');
    });
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicalRecordPage');
  }

}
