import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CommonUtilsProvider } from '../../providers/common-utils/common-utils'; 


@IonicPage()
@Component({
  selector: 'page-instant-info',
  templateUrl: 'instant-info.html',
})
export class InstantInfoPage {

  readonly:boolean = true;
  instantInfo = {doctor:"", allergies:"", medication:"", emergency:""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataProvider, public commonUtils:CommonUtilsProvider) {
  }

  toggleReadonly () {
    // if we tapped done, we need to save
    if (!this.readonly) {
      // we were in edit mode
      // do we really need this since we are saving on WillLeave?
      this.dataService.saveInstantInfo(this.instantInfo);
    }
    this.readonly = !this.readonly;
  }

  ionViewWillLeave()
  {
    console.log ("Leaving view, saving...");
    this.dataService.saveInstantInfo(this.instantInfo);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstantInfoPage');
    this.commonUtils.bumpNumber();
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
