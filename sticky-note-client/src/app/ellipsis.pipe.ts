import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  // transform(value: string, maxLength:number): any {
  //   const suffix:string = (value && value.length < maxLength) ? '...' : '';

  //   return this.transform(value,maxLength) + suffix;
  // }

  transform(value: string, args: number): any {
    
    value = (value.length > args)?
    value.substring(0, args) + '...':value
    
    return value;
  }

}
