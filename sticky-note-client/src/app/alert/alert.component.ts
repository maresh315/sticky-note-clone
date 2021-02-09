import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message:string;

  constructor() { }

  ngOnInit(): void {
    this.message = 'Are You Sure About This Action??'
  }

  onClick(bool:boolean){
    // if(!bool){return}

    console.log('i click')
  }

}
