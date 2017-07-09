import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { CommonUtilsProvider } from '../../providers/common-utils/common-utils';


/**
 * Generated class for the ItemViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-item-view',
  templateUrl: 'item-view.html',
})
export class ItemViewPage {
  item:any;
  constructor(public commonUtils:CommonUtilsProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.item = navParams.get("item");
    //console.log ("ITEM="+JSON.stringify(this.item));
  }

  removeModal(){
   // console.log ("REMOVE MODAL");
   this.viewCtrl.dismiss();
 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemViewPage');
  
  }

    public getFullPath(img) {
    let path =  this.commonUtils.getFullPath(img);
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

}
