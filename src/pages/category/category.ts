import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform } from 'ionic-angular';
import { MedicalRecordModel } from '../../models/medicalrecord-model';
import { DataProvider } from '../../providers/data/data';
import { Keyboard } from '@ionic-native/keyboard';
import { List } from 'ionic-angular';
import { CommonUtilsProvider } from '../../providers/common-utils/common-utils';


//type Category = { title: string, records: MedicalRecordModel };
@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  @ViewChild(List) list: List; // needed to close sliding list
  categories: { title: string, record: MedicalRecordModel }[] = [];
  term:string = '';
  searchEnabled:boolean = false;
 

  constructor(public navCtrl: NavController, public dataService: DataProvider, public alertCtrl: AlertController, public platform: Platform, public keyboard: Keyboard, public commonUtils:CommonUtilsProvider) {
    console.log("CategoryPage constructor");
  }

    

  ionViewDidLoad() {
    console.log("Inside viewload in homepage");

    this.platform.ready().then(() => {
      console.log(this.platform.platforms());
  
      // load data from DB
      this.dataService.getData().then((categories) => {
        let savedCategories: any = false;
        if (typeof (categories) != "undefined") {
          savedCategories = JSON.parse(categories);
          // if we have a DB, this is not the first run
          
        }

        if (savedCategories) {
          console.log("saved categories found");
          this.dataService.setIntroShown(true);
          savedCategories.forEach((savedCategory) => {
            // load the data and re-create observers
            let newMedicalRecord = new MedicalRecordModel(savedCategory.items);
            this.categories.push({ title: savedCategory.title, record: newMedicalRecord });
            newMedicalRecord.itemUpdates().subscribe(update => {
              this.save();
              console.log("observable of category called inside dataService load with " + update);
            });
          })
        }
        // no stored categories, so create default categories
        else {
          console.log("No categories saved, creating...");
          this.dataService.setIntroShown(false);
          var defaultCategories = ["X-Rays", "Medical reports", "Lab Results", "EKG"];
          for (let label of defaultCategories) {
            let newMedicalRecord = new MedicalRecordModel([]);
            this.categories.push({ title: label, record: newMedicalRecord });
            newMedicalRecord.itemUpdates().subscribe(update => {
              this.save();
              console.log("observable of category called inside defaultCategories with " + update);
            });
            this.save();
          }
        }
        // make sure into is only shown once
        if (!this.dataService.isIntroShown()) {
          this.dataService.setIntroShown(true);
          this.navCtrl.setRoot("IntroPage");
          console.log("Showing Intro");
        }
        else {
          console.log("Intro already shown");
        }
      })
    })

  }

  searchFn(ev: any) {
    //console.log ("SEARCHFN");
    this.term = ev.target.value;
  }
  
  toggleSearch(): void {
    this.searchEnabled = !this.searchEnabled;
  }
  
  // create new record category
  addCategory(): void {
    // tbd
    let prompt = this.alertCtrl.create({
      title: 'New Category',
      message: 'Enter new category name:', inputs: [
        {
          name: 'name'
        }],
      buttons: [{
        text: 'Cancel'
      },
      {
        text: 'Save', handler: data => {

          data.name = data.name.trim();
          if (!data.name) return;

          if (!this.categoryExist(data.name))
          {
            let newMedicalRecord = new MedicalRecordModel([]);
          this.categories.push({ title: data.name, record: newMedicalRecord });

          newMedicalRecord.itemUpdates().subscribe(update => {
            this.save();
            console.log(" observable called inside addCategory with " + update);
          });
          this.save();
          console.log("saved inside addCategory");

        }
        else {
          this.commonUtils.presentToast('category exists', 'error');
        }
          
        }
      }
      ]
    });
    prompt.present();
  
  }

  categoryExist(name):boolean {
    let found:boolean = false;
    name = name.toLowerCase();
    for (let i=0; i< this.categories.length; i++)
    {
      if (this.categories[i].title.toLowerCase() == name)
      {
        found = true;
        break;
      }
    }
    return found;
  }


  // rename existing record category
  renameCategory(category, id): void {
    let prompt = this.alertCtrl.create({
      title: 'Rename Category',
      message: 'Enter new name for this category:', inputs: [
        {
          name: 'name'
        }],
      buttons: [{
        text: 'Cancel'
      },
      {
        text: 'Save', handler: data => {
          let i = this.categories.indexOf(category);
          if (i > -1) {
            this.categories[i].title = data.name;
            this.save();
          }
          console.log("saved inside renameCategory");

        }
      }
      ]
    });
    prompt.present().then(() => { this.list.closeSlidingItems(); });
  }


  instantInfo(): void {
    console.log("pushing instant view to nav");
    this.navCtrl.push('InstantInfoPage');
  }

  // show records within a category
  viewCategory(category): void {
    console.log("pushing category to nav");
    this.navCtrl.push('MedicalRecordPage', { category: category, root:this.categories });
  }

  // remove category and all records along with it
  removeCategory(category): void {
    let i = this.categories.indexOf(category);
    let alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: 'Delete ' + category.title + ' and all records in it?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel tapped');
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'OK',
          handler: () => {
            console.log('Ok clicked');
            category.record.items.forEach((item) => {
              console.log("Deleting " + item.notes);
            });
            if (i > -1){ this.categories.splice(i, 1); this.save(); }
            this.list.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();



  }

  // save all categories and associated records
  save(): Promise <any> {
    //console.log ("inside save of category.ts");
    this.keyboard.close();
   return  this.dataService.save(this.categories);
  }

}
