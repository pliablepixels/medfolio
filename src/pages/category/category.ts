import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform } from 'ionic-angular';
import { MedicalRecordModel } from '../../models/medicalrecord-model';
import { DataProvider } from '../../providers/data/data';
//import {IntroPage} from '../intro/intro';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';




// page 177
@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  categories: MedicalRecordModel[] = [];
  constructor( public navCtrl: NavController, public dataService: DataProvider, public alertCtrl: AlertController, public platform: Platform, keyboard: Keyboard) {
    console.log ("CategoryPage constructor");
  }

  ionViewDidLoad() {
    console.log ("Inside viewload in homepage");

    if (this.categories.length == 0){

          var defaultCategories = ["X-Rays", "Medical reports", "Lab Results"];
          for (let i of defaultCategories) {
              let newMedicalRecord = new MedicalRecordModel(i, []); 
              this.categories.push(newMedicalRecord);
              newMedicalRecord.checklistUpdates().subscribe(update => {
              this.save();
              console.log ("checklist observable inside home.ts");
          }); 
          this.save();
          }
          
    }

    this.platform.ready().then (() => {
      if (!this.dataService.isIntroShown())
      {
          this.dataService.setIntroShown(true);
          this.navCtrl.setRoot("IntroPage");
          console.log ("Showing Intro");
      }
      else
      {
         console.log ("Intro already shown");
      }
       
       
    });
  }
  addChecklist(): void {
  
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
          let newMedicalRecord = new MedicalRecordModel(data.name, []); 
          this.categories.push(newMedicalRecord);
          newMedicalRecord.checklistUpdates().subscribe(update => {
            this.save();
            console.log ("checklist observable inside home.ts");
          }); 
          this.save();
          console.log ("saved inside addChecklist");
        }
      }
      ]
    });
    prompt.present();

  }
  renameChecklist(category): void {
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
            this.categories[i].setTitle(data.name);
            this.save();
          }
          console.log ("saved inside renameChecklist");
        }
      }
      ]
    });
    prompt.present();
  }
  viewCategory(category): void {
    console.log ("pushing category to nav");
    this.navCtrl.push('MedicalRecordPage', {category:category});
  }
  removeChecklist(medicalRecord): void {
    let i = this.categories.indexOf(medicalRecord);
    if (i > -1) {this.categories.splice (i,1);this.save();}
  }

  save(): void {
    console.log ("save of home.ts");
  }

}
