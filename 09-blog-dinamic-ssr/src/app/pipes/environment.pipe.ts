import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.development';
@Pipe({
  name: 'environment'
})
export class EnvironmentPipe implements PipeTransform {

  // keyof typeof environment => propiedades del environment
  transform(key: keyof typeof environment): any {
    return environment[key];
  }

}
