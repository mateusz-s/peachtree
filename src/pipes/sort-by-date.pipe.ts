import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash';
import * as moment from 'moment';

@Pipe({
  name: 'sortByDate',
  pure: false,
})
export class SortByDatePipe implements PipeTransform {
  transform(value: any[], order = '', column: string = ''): any[] {
    if (!value || order === '' || !order) {
      return value;
    }
    if (value.length <= 1) {
      return value;
    }
    if (!column || column === '') {
      if (order === 'asc') {
        return value.sort();
      } else {
        return value.sort().reverse();
      }
    }
    return value.sort((a, b) => {
      const aVal = get(a, column);
      const bVal = get(b, column);
      const parsedAVal = moment(aVal);
      const parsedBVal = moment(bVal);
      return (parsedBVal as any) - (parsedAVal as any);
    });
  }
}
