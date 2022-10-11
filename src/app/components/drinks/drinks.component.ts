import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  public drinks : any[] = [];

  constructor(public requestService : RequestService) { }

  ngOnInit(): void {
    this.requestService.getObtener('margarita').subscribe({
      next : resp => {
        console.log(resp);
        this.drinks = resp;
    }});

  }

}
