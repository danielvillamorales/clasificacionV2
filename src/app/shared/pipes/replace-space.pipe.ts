import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceSpace',
  standalone: true,
})
export class ReplaceSpacePipe implements PipeTransform {
  transform(valor: string | null): string {
    if (!valor) {
      return 'Sin Clasificar';
    }
    return valor.replace(/ /g, '_').replace(/%/g, '');
  }
}
