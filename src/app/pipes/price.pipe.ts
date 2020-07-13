import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number): string {
    let result = value.toString();
    const splittedNumber = result.toString().split('.');
    const floatingPart = splittedNumber[1];
    if (floatingPart && floatingPart.length === 1) {
      result += '0';
    }
    return result;
  }

}
