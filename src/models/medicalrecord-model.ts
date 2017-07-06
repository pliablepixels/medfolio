import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import { File } from '@ionic-native/file';

export class MedicalRecordModel {
    medicalRecord:any;
    medicalRecordObserver:any;
   
    constructor (public items: any[]){
        
        this.items = items;
        this.medicalRecord = Observable.create(observer => { 
            this.medicalRecordObserver = observer;
        });

    } 

    // add a new item to a specific category
    addItem(obj):void {
        
        let item = {
            notes:obj.notes,
            photo:[],
            date:obj.date || moment().format("MMM Do YYYY, h:mm:ss a"),
        };
        item.photo.push(obj.photo);
        this.items.unshift(item);
        this.medicalRecordObserver.next(true);

    }

    addPhotoToItem (photo, item):void
    {
        item.photo.push(photo);
        this.medicalRecordObserver.next(true);
        console.log ("ITEM PHOTO ADDED " + JSON.stringify(item));

    }



    // remove an new item from a specific category
    removeItem(item, removeFile:boolean = true){
        let file = new File;
        console.log ("inside item delete with "+file.dataDirectory);
        let index = this.items.indexOf(item);
        if (index >-1) {this.items.splice(index,1);}
        // Let's also remmber to remove the associated photo
        this.medicalRecordObserver.next(true);
        if (removeFile)
        {
            for (let i=0; i<item.photo.length; i++) {
                file.removeFile (file.dataDirectory, item.photo[i]);
            }

            return Promise.resolve(); 

        }
        else
        {
            console.log ("Not removing file...");
            return Promise.resolve();
        }
        



    }
    // edit the note associated to the item
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

    itemUpdates(): Observable<any> 
    { 
        return this.medicalRecord;
    }
}