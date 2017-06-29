import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import { File } from '@ionic-native/file';

import { CommonUtilsProvider } from '../providers/common-utils/common-utils';



 //var file:File;


export class MedicalRecordModel {
    medicalRecord:any;
    medicalRecordObserver:any;
   
   

    constructor (public items: any[]){
        
        this.items = items;
        this.medicalRecord = Observable.create(observer => { 
            this.medicalRecordObserver = observer;
        });

    } 

    addItem(obj):void {
        this.items.unshift({
            notes:obj.notes,
            photo:obj.photo,
            date:moment().format("MMM Do YYYY, h:mm:ss a"),
            checked:false
        });
        this.medicalRecordObserver.next(true);

    }

    removeItem(item){
        let file = new File;
        
        
        console.log ("inside item delete with "+file.dataDirectory);
        let index = this.items.indexOf(item);
        if (index >-1) {this.items.splice(index,1);}

        return file.removeFile (file.dataDirectory, item.photo);



    }

    

    updateNote(item,note):void {
        console.log ("Inside updateNote with:"+JSON.stringify(item));
        console.log ("Change note to:"+note);
        let index = this.items.indexOf(item);
        if (index >-1) {
            this.items[index].notes = note;
            this.medicalRecordObserver.next(true);
        }
        else
        {
            console.log ("ITEM NOT FOUND");
        }
        
        
    }

    
    checklistUpdates(): Observable<any> 
    { 
        return this.medicalRecord;
    }
}