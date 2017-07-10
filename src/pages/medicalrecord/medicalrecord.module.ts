import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalRecordPage } from './medicalrecord';
import {Pipes} from "../../pipes/pipes"
import { MaterialIconsModule } from 'ionic2-material-icons';

@NgModule({
  declarations: [
    MedicalRecordPage,
    ],
  
  imports: [
    IonicPageModule.forChild(MedicalRecordPage),
    Pipes,
    MaterialIconsModule,
    
  ],
  exports: [
    MedicalRecordPage
  ]
})
export class MedicalPageModule {}
