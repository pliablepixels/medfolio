import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform } from 'ionic-angular';
import { MedicalRecordModel } from '../../models/medicalrecord-model';
import { DataProvider } from '../../providers/data/data';
//import {IntroPage} from '../intro/intro';
import { Keyboard } from '@ionic-native/keyboard';
import { List } from 'ionic-angular';



type Category = { title: string, records: MedicalRecordModel };

// page 177
@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

   @ViewChild(List) list: List;

  categories: { title: string, record: MedicalRecordModel }[] = [];

  constructor(public navCtrl: NavController, public dataService: DataProvider, public alertCtrl: AlertController, public platform: Platform, public keyboard: Keyboard) {
    console.log("CategoryPage constructor");
  }

  ionViewDidLoad() {
    console.log("Inside viewload in homepage");

    this.platform.ready().then(() => {
      this.dataService.getData().then((categories) => {
        let savedCategories: any = false;
        if (typeof (categories) != "undefined") {
          savedCategories = JSON.parse(categories);
        }

        if (savedCategories) {
          console.log ("saved categories found");
          savedCategories.forEach((savedCategory) => {
            //console.log ("retrieving "+JSON.stringify(savedCategory.items));
            let newMedicalRecord = new MedicalRecordModel(savedCategory.items);
            this.categories.push({ title: savedCategory.title, record: newMedicalRecord });
            newMedicalRecord.checklistUpdates().subscribe(update => {
              this.save();
              console.log("observable of category called inside dataService load with " + update);
            });
          })
          //console.log (this.categories);
        }
        // no stored categories, so create dummies
        else {
          console.log ("No categories saved, creating...");
          var defaultCategories = ["X-Rays", "Medical reports", "Lab Results"];
          for (let label of defaultCategories) {
            let newMedicalRecord = new MedicalRecordModel([]);
            this.categories.push({ title: label, record: newMedicalRecord });
            newMedicalRecord.checklistUpdates().subscribe(update => {
              this.save();
              console.log("observable of category called inside defaultCategories with " + update);
            });

          }

        }

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
  addCategory(): void {

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
          let newMedicalRecord = new MedicalRecordModel([]);
          this.categories.push({ title: data.name, record: newMedicalRecord });

          newMedicalRecord.checklistUpdates().subscribe(update => {
            this.save();
            console.log(" observable called inside addCategory with " + update);
          });
          this.save();
          console.log("saved inside addChecklist");
        }
      }
      ]
    });
    prompt.present();

  }
  renameCategory(category,id): void {
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
    prompt.present().then(()=> {this.list.closeSlidingItems();});
  }
  viewCategory(category): void {
    console.log("pushing category to nav");
    this.navCtrl.push('MedicalRecordPage', { category: category });
  }
  removeCategory(category): void {
    let i = this.categories.indexOf(category);
    // TBD: remove files
    if (i > -1) { this.categories.splice(i, 1); this.save(); }
  }

  save(): void {
    //console.log ("inside save of category.ts");
    this.keyboard.close();
    this.dataService.save(this.categories);
  }

}
