import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("intro constructor");
  }

  goHome(): void {
    this.navCtrl.setRoot("CategoryPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

}
