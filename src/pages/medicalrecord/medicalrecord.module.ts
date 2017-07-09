import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalRecordPage } from './medicalrecord';
import {Pipes} from "../../pipes/pipes"
//import { GalleryModal } from 'ionic-gallery-modal';
//import { ZoomableImage } from 'ionic-gallery-modal';
import { MaterialIconsModule } from 'ionic2-material-icons';

@NgModule({
  declarations: [
    MedicalRecordPage,
  //  GalleryModal,
  //  ZoomableImage,

  ],
  /*entryComponents: [
    GalleryModal,
  ],*/
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
