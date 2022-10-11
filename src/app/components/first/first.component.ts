import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  flag : boolean = true;

  constructor(private infoService : InfoService) { }

  ngOnInit(): void {
  }

  onClick(){
    console.log('Uno click');
    this.infoService.data$.next({name : 'Eduardo',password : '12345'})
  }

  

}
