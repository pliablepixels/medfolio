import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataProvider {

  introShown: boolean = false;

  //constructor(public http: Http) {
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

      saveData.push({
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
  }
  isIntroShown(): boolean {
    return this.introShown;
  }


}
