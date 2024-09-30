import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUpperCase',
  standalone: true
})
export class FirstLetterUpperCasePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if(!value){
      return '';
    }
    const trimmedValue = value.trim();
    return trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);
  }
}
