import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  isConfirmed:boolean;

  constructor() { }

  confirm(confirmation:boolean){
    if(!this.isConfirmed){
      this.isConfirmed = confirmation;
    }
    return this.isConfirmed;
  }

  reset(){
    this.isConfirmed = false;
  }
}
