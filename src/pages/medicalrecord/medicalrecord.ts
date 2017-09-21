import { Component } from '@angular/core';
import { ModalController, IonicPage, NavParams, AlertController, NavController, ActionSheetController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Crop } from '@ionic-native/crop'
import { ImageViewerController } from 'ionic-img-viewer';
import { CommonUtilsProvider } from '../../providers/common-utils/common-utils';
import { AndroidPermissions } from '@ionic-native/android-permissions';


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
  viewMode: string;
  term: string = '';
  searchEnabled: boolean = false;
  cardSettings: boolean = false;
  categories: any;

  constructor(public modal: ModalController, public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public platform: Platform, public loadingCtrl: LoadingController, public socialSharing: SocialSharing, public imageViewerCtrl: ImageViewerController, public commonUtils: CommonUtilsProvider, public camera: Camera, public file: File, public filePath: FilePath, public crop: Crop, public androidPermissions: AndroidPermissions) {

    console.log("medicalrecord page constructor");
    this.selectedCategory = this.navParams.get('category');
    this.categories = this.navParams.get('root');

    for (let i = 0; i < this.categories.length; i++) {
      console.log("**** CATEGORY " + this.categories[i].title);
    }

    this.viewMode = 'cards';
  }

  isMultiplePhotos(item) {
    return item.photo.length > 1;
  }

  toggleSettingsCards() {
    this.cardSettings = !this.cardSettings;
  }

  toggleSearch(): void {
    this.searchEnabled = !this.searchEnabled;
  }
  searchFn(ev: any) {
    //console.log ("SEARCHFN");
    this.term = ev.target.value;
  }

  presentModal(item) {
    //console.log ("SENDING ITEM="+JSON.stringify(item));
    let im = this.modal.create("ItemViewPage", { "item": item });
    im.present();

    /*let modal = this.modal.create("GalleryModal", {
  photos: item.photo,
  initialSlide: 0
});
modal.present();*/

  }

  // not currenty used
  presentImage(myImage) {
    console.log("PresentImage with " + myImage);
    const imageViewer = this.imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

  presentActionSheet(item?) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Select from Album',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, item);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA, item);
          }
        },

        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    // add a dummy local asset so I can test on desktop
    if (this.platform.is('core')) {
      actionSheet.addButton(
        {
          text: 'Dummy',
          handler: () => {
            //this.takePicture(this.camera.PictureSourceType.CAMERA);
            if (!item) {
              this.selectedCategory.record.addItem({ notes: '', photo: ['assets/images/doctor.png'] });
            }
            else {
              this.selectedCategory.record.addPhotoToItem('assets/images/doctor.png', item);
            }

          }
        }
      );
    }


    actionSheet.present();
  }



  // Always get the accurate path to your apps folder
  public getFullPath(img) {
    let path = this.commonUtils.getFullPath(img);
    // WKWebView specific code - doesn't work 
    /*
    if (this.platform.is('ios'))
    {
      //console.log ("removing path...");
      if (path.startsWith("file://")) {
        path = path.slice(8);
        console.log ("SLICED and returning "+path);
      }
    }*/
    return path;

  }

  addItem() {
    if (this.platform.is('core')) {
      this.presentActionSheet();
      return;
    }

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      success => {
        console.log('Permission granted,taking picture');
        this.presentActionSheet();
      },
      err => {
        this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.CAMERA).then(success => { this.presentActionSheet(); }, err => { this.commonUtils.presentToast("Please grant camera permission", "error"); });
      }
    );


  }

  addPhotoToItem(item): void {
    //this.selectedCategory.record.addPhotoToItem(photo,item)
    this.presentActionSheet(item);
  }


  removeItem(item, removeFile = true): void {
    console.log("Calling model remove");
    this.selectedCategory.record.removeItem(item, removeFile)
      .then(success => {
        //this.commonUtils.presentToast('success deleting');
      },
      error => {
        //this.commonUtils.presentToast('error deleting image','error');
      });
  }

  getCategory(val) {
    let category: any = undefined;
    console.log("Searching for category=" + val);

    for (let i = 0; i < this.categories.length; i++) {
      console.log("comparing to" + this.categories[i].title);
      if (this.categories[i].title == val) {
        console.log("FOUND");
        category = this.categories[i];
        break;
      }
    }
    return category;
  }

  moveItem(item): void {
    let options = {
      title: 'Move to Category',
      inputs: [],
      message: '',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            console.log("GOT " + data);
            let cat = this.getCategory(data);
            if (cat) {
              console.log("MOVING to " + cat);

              cat.record.addItem({ notes: item.notes, photo: item.photo, date: item.date });
              this.removeItem(item, false);

            }

          }
        }
      ]
    };
    for (let i = 0; i < this.categories.length; i++) {
      if (this.selectedCategory.title != this.categories[i].title) {
        options.inputs.push({ type: 'radio', label: this.categories[i].title, value: this.categories[i].title });
      }

    }
    let prompt = this.alertCtrl.create(options);


    prompt.present();
  }

  updateNote(item): void {

    let prompt = this.alertCtrl.create({
      title: 'Add notes',
      message: 'Enter notes below:',
      inputs: [
        {
          name: 'notes',
          value: item.notes

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
      files: [], //the paramater
      chooserTitle: 'Share via...'
    };

    for (let i = 0; i < item.photo.length; i++) {
      options.files.push(this.getFullPath(item.photo[i]));
    }

    this.socialSharing.shareWithOptions(options).then(() => {
      // Success!
      //this.commonUtils.presentToast('Success sharing');
    }).catch(() => {
      this.commonUtils.presentToast('Error while sharing image.', 'error');
    });
  }



  // Copy the image to a local folder
  copyFileToLocalDir(namePath, currentName, newFileName): Promise<any> {
    console.log("inside copyFileToLocal Dir *** persistent " + this.file.dataDirectory);
    return this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName);

  }

  takePicture(sourceType, item?) {
    // if item provided then we add a photo to it
    var options = {
      quality: 70,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      allowEdit: false
    };

    // Get the data of an image
    let newFileName = this.commonUtils.createFileName();
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      console.log("---->getPicture returned " + imagePath);
 
      this.commonUtils.presentLoader('saving...');
      this.savePhoto(newFileName, imagePath, sourceType).then(success => {
        this.commonUtils.removerLoader();
        if (!item) {
          this.selectedCategory.record.addItem({ notes: '', photo: [newFileName] });
        }
        else {
          this.selectedCategory.record.addPhotoToItem(newFileName, item);
        }
      },
        error => {
          this.commonUtils.removerLoader();
          this.commonUtils.presentToast('error saving image', 'error');
        });
    },// getpicture
    (error) => {console.log (JSON.stringify(error));this.commonUtils.presentToast('error taking image', 'error');});
  }

  savePhoto(newFileName, imagePath, sourceType): Promise<any> {

    console.log("--->savePhoto newFileName=" + newFileName + " imagePath=" + imagePath);


    if (0 && this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));

          console.log("Android: copying " + newFileName + " to " + correctPath + currentName);
          console.log("album calling copyFileToLocalDir with newFileName:" + newFileName + "  correctPath+currentName=" + correctPath + currentName);
          return this.copyFileToLocalDir(correctPath, currentName, newFileName);

        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      console.log("calling copyFileToLocalDir with newFileName:" + newFileName + "  correctPath+currentName=" + correctPath + currentName);
      return this.copyFileToLocalDir(correctPath, currentName, newFileName);

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicalRecordPage');
    //this.commonUtils.presentLoader('random string '+Date());
    this.commonUtils.bumpNumber();
  }


  ngAfterViewInit() {

  }

}
