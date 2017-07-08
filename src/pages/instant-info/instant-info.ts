import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-instant-info',
  templateUrl: 'instant-info.html',
})
export class InstantInfoPage {

  readonly:boolean = true;
  instantInfo = {doctor:"", allergies:"", emergency:""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataProvider) {
  }

  toggleReadonly () {
    // if we tapped done, we need to save
    if (!this.readonly) {
      // we were in edit mode
      this.dataService.saveInstantInfo(this.instantInfo);
    }
    this.readonly = !this.readonly;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InstantInfoPage');
    this.dataService.getInstantInfo().then( (instant)=>{
        if (instant)
        {
          console.log ("Instant info found");
          this.instantInfo = JSON.parse(instant);
        }
        else
        {
          console.log ("Instant info NOT found");
          this.readonly = false;
        }
    });

  }

}
