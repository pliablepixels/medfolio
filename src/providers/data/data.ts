import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

// DB Handler

@Injectable()
export class DataProvider {

  introShown: boolean = false;
  constructor(public storage: Storage) {
    console.log(' DataProvider Provider constructor');
  }

  getInstantInfo(): Promise <any> {
    return this.storage.get('instantInfo');
  }

  saveInstantInfo(instant): Promise <any> {
    let strData = JSON.stringify(instant);
    console.log("--->Saving: " + strData);
    return this.storage.set('instantInfo', strData);
  }

  getData(): Promise<any> {
    return this.storage.get('categories');
  }

  save(categories): Promise <any> {
    console.log("inside data-model save");
    let saveData = [];
    categories.forEach((category) => {
      
        saveData.push({ // leave out observables
        title: category.title,
        items: category.record.items
      });

    
      
    });
    let strData = JSON.stringify(saveData);
     console.log("--->Saving: " + strData);
    return this.storage.set('categories', strData);
   



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
