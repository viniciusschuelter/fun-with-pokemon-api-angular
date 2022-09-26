import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
  transform(array: any[], prop: string, target: string): any[] {
    if (!array?.length || !target) {
      return array?.length ? array : [];
    }
    console.log(array);
    console.log(prop);
    console.log(target);
    return array.filter(item => (item[prop] || item).includes(target.toLowerCase()));
  }
}
