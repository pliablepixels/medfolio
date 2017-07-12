import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'SearchCategoryPipe',
  pure:true
})
@Injectable()
export class SearchCategoryPipe implements PipeTransform {
  
  transform(categories:any[], param:string) {
    //console.log (" GOT PARAM="+param);
    if (param) {
      param = param.toLowerCase();
      return categories.filter(category => {
          return (category.title.toLowerCase().indexOf(param) !== -1 ||
                 category.title.toLowerCase().indexOf(param) !== -1);
        });
    }
    else {
      return categories;
    }
   
  }
}



