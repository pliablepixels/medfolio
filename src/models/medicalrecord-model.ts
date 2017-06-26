import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';

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

    removeItem(item):void {
        let index = this.items.indexOf(item);
        if (index >-1) {this.items.splice(index,1);}
        this.medicalRecordObserver.next(true);
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