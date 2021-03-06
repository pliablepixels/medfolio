import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'SearchRecordPipe',
  pure:true
})
@Injectable()
export class SearchRecordPipe implements PipeTransform {
  
  transform(items:any[], param:string) {
    //console.log (" GOT PARAM="+param);
    if (param) {
      param = param.toLowerCase();
      return items.filter(item => {
          return (item.notes.toLowerCase().indexOf(param) !== -1 ||
                 item.date.toLowerCase().indexOf(param) !== -1);
        });
    }
    else {
      return items;
    }
   
  }
}



