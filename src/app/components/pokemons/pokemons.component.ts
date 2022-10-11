import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {

  public pokemon$ !: Observable<any>

  constructor(public pokemonService : RequestService) { 

    this.pokemon$ = this.pokemonService.getPokemon().pipe(
      tap( res => {
        console.log(res);
      })
    )
  }

  ngOnInit(): void {
  }

}
