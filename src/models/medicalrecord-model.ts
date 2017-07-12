import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { File } from '@ionic-native/file';

// reflects one 'record' in a category.

export class MedicalRecordModel {
    medicalRecord: any;
    medicalRecordObserver: any;
    constructor(public items: any[]) {

        this.items = items;
        this.medicalRecord = Observable.create(observer => {
            this.medicalRecordObserver = observer;
        });

    }

    // add a new item to a specific category
    addItem(obj): void {

        let item = {
            notes: obj.notes,
            photo: [],
            date: obj.date || moment().format("MMM Do, h:mm a"),
        };
        //item.photo.push(obj.photo);
        item.photo = obj.photo;
        this.items.unshift(item);
        this.medicalRecordObserver.next(true);

    }

    // add a new photo to a specified item
    addPhotoToItem(photo, item): void {
        item.photo.push(photo);
        this.medicalRecordObserver.next(true);
        console.log("ITEM PHOTO ADDED " + JSON.stringify(item));

    }

    // remove an new item from a specific category
    // this is also called for file move in which
    // case only the item index needs to be removed
    // but not the actual file, which is why removeFile
    // exists
    removeItem(item, removeFile: boolean = true): Promise <any> {
        let file = new File;
        console.log("inside item delete with " + file.dataDirectory);
        let index = this.items.indexOf(item);
        if (index > -1) { this.items.splice(index, 1); }
        // Let's also remmber to remove the associated photo
        this.medicalRecordObserver.next(true);
        if (removeFile) {
            for (let i = 0; i < item.photo.length; i++) {
                file.removeFile(file.dataDirectory, item.photo[i]);
            }

            return Promise.resolve();

        }
        else {
            console.log("Not removing file...");
            return Promise.resolve();
        }




    }
    // edit the note associated to the item
    updateNote(item, note): void {
        console.log("Inside updateNote with:" + JSON.stringify(item));
        console.log("Change note to:" + note);
        let index = this.items.indexOf(item);
        if (index > -1) {
            this.items[index].notes = note;
            this.medicalRecordObserver.next(true);
        }
        else {
            console.log("ITEM NOT FOUND");
        }
    }

    itemUpdates(): Observable<any> {
        return this.medicalRecord;
    }
}