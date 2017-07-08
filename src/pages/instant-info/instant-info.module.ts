import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstantInfoPage } from './instant-info';

@NgModule({
  declarations: [
    InstantInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(InstantInfoPage),
  ],
  exports: [
    InstantInfoPage
  ]
})
export class InstantInfoPageModule {}
