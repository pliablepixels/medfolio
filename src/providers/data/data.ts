import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataProvider {

  introShown:boolean = false;

  //constructor(public http: Http) {
    constructor() {
    console.log(' DataProvider Provider constructor');
  }

  setIntroShown(val):void {
    this.introShown = val;
  }
  isIntroShown():boolean {
    return this.introShown;
  }


}
