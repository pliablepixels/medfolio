import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalRecordPage } from './medicalrecord';

@NgModule({
  declarations: [
    MedicalRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalRecordPage),
  ],
  exports: [
    MedicalRecordPage
  ]
})
export class MedicalPageModule {}
