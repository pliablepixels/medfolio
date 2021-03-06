import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
//import {Diagnostic} from '@ionic-native/diagnostic';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';

import { MyApp } from './app.component';
import { DataProvider } from '../providers/data/data';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { CommonUtilsProvider } from '../providers/common-utils/common-utils';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { MaterialIconsModule } from 'ionic2-material-icons';
import { ElasticModule } from 'ng-elastic';



@NgModule({
  declarations: [
    MyApp,
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    IonicImageViewerModule,
    MaterialIconsModule,
    ElasticModule,
  

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
 

  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataProvider,
    Keyboard,
    File,
    FileTransfer,
    Camera,
    Crop,
    FilePath,
    SocialSharing,
    //Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonUtilsProvider,
    AndroidPermissions,
  ]
})
export class AppModule {}
