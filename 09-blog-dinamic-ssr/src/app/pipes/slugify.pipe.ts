import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify',
  standalone: true
})
export class SlugifyPipe implements PipeTransform {

  transform(value: string): string {
    return value
      .toLowerCase() // Minusculas
      .trim() // Eliminar espacios delante y atras
      .replace(/[^a-z0-9 -]/g, '') // eliminar caracteres especiales
      .replace(/\s+/g, '-') // sustituir espacios por -
      .replace(/-+/g, '-'); // sustituir guiones multiples por un solo -
  }

}
