import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform } from 'ionic-angular';
import { MedicalRecordModel } from '../../models/medicalrecord-model';
import { DataProvider } from '../../providers/data/data';
//import {IntroPage} from '../intro/intro';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';


type Category ={title: string, records: MedicalRecordModel};

// page 177
@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {


  categories:{title:string, record:MedicalRecordModel}[]=[] ;

  constructor( public navCtrl: NavController, public dataService: DataProvider, public alertCtrl: AlertController, public platform: Platform, keyboard: Keyboard) {
    console.log ("CategoryPage constructor");
  }

  ionViewDidLoad() {
    console.log ("Inside viewload in homepage");

    if (this.categories.length == 0){

          var defaultCategories = ["X-Rays", "Medical reports", "Lab Results"];
          for (let label of defaultCategories) {
              let newMedicalRecord = new MedicalRecordModel([]); 
              this.categories.push({title:label, record:newMedicalRecord});
              newMedicalRecord.checklistUpdates().subscribe(update => {
              this.save();
              console.log ("observable of category called inside defaultCategories");
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
           this.categories.push({title:data.name, record:newMedicalRecord});
          
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
  renameCategory(category): void {
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
          console.log ("saved inside renameCategory");
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
  removeCategory(category): void {
    let i = this.categories.indexOf(category);
    if (i > -1) {this.categories.splice (i,1);this.save();}
  }

  save(): void {
    console.log ("inside save of category.ts");
  }

}
