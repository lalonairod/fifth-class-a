import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { InfoService } from '../../services/info.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {

  public detector$ : Observable<any>

  constructor(public infoService : InfoService) {
    this.detector$ = this.infoService.data$.pipe(tap(resp => {
      console.log('Pipe: ',resp)
    }))
   }

  ngOnInit(): void {
  }

}
