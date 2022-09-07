import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {

  transform(value: any[] = [], term, exact = true): any {
    if (!value || !term) {
      return value || [];
    }
    const [key, machValue] = term;
    return value.filter(v => exact ? v[key] === machValue : String(v[key]).toLowerCase().includes(machValue.toLowerCase()));
  }

}
