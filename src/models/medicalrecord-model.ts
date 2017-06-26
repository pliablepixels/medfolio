import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';

export class MedicalRecordModel {
    medicalRecord:any;
    medicalRecordObserver:any;

    constructor (public title:string, public items: any[]){
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

    renameItem(item,title):void {
        let index = this.items.indexOf(item);
        if (index >-1) {this.items[index].title = title;}
        this.medicalRecordObserver.next(true);

    }

    setTitle(title):void {
        this.title = title;
        this.medicalRecordObserver.next(true);
    }

    toggleItem(item):void {
        item.checked = !item.checked;
        this.medicalRecordObserver.next(true);
    }

    checklistUpdates(): Observable<any> 
    { 
        return this.medicalRecord;
    }
}