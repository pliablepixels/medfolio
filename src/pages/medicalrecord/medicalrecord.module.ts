import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalRecordPage } from './medicalrecord';
import {Pipes} from "../../pipes/pipes"


@NgModule({
  declarations: [
    MedicalRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalRecordPage),
    Pipes
  ],
  exports: [
    MedicalRecordPage
  ]
})
export class MedicalPageModule {}
