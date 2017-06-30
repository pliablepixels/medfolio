import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

// DB Handler

@Injectable()
export class DataProvider {

  introShown: boolean = false;
  constructor(public storage: Storage) {
    console.log(' DataProvider Provider constructor');
  }


  getData(): Promise<any> {
    return this.storage.get('categories');
  }

  save(categories) {
    console.log("inside data-model save");
    let saveData = [];
    categories.forEach((category) => {

      saveData.push({ // leave out observables
        title: category.title,
        items: category.record.items
      })
    });
    let strData = JSON.stringify(saveData);
    this.storage.set('categories', strData);
    console.log("--->Saved: " + strData);



  }
  setIntroShown(val): void {
    this.introShown = val;
    console.log ("setting intro:"+this.introShown);
    
  }
  isIntroShown(): boolean {
    console.log ("returning intro:"+this.introShown);
    return this.introShown;
  }


}
