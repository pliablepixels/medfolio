import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPage } from './category';
import {Pipes} from "../../pipes/pipes";
//import { TooltipsModule } from 'ionic-tooltips';

@NgModule({
  declarations: [
    CategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryPage),
    Pipes
  //  TooltipsModule
  ],
  exports: [
    CategoryPage
  ]
})
export class CategoryPageModule {}
