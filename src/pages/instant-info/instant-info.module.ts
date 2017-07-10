import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstantInfoPage } from './instant-info';
import { ElasticModule } from 'ng-elastic';

@NgModule({
  declarations: [
    InstantInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(InstantInfoPage),
    ElasticModule,
  ],
  exports: [
    InstantInfoPage
  ]
})
export class InstantInfoPageModule {}
