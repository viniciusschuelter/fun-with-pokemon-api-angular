import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(array: any[], prop: string, target: string): any[] {
    if (!array?.length || !target) {
      return array?.length ? array : [];
    }
    return array.filter((item: any) => (item[prop] || item).includes(target.toLowerCase())
    );
  }
}
