import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge, Observable } from 'rxjs';
import { combineLatestAll, concatMap, map, tap } from 'rxjs/operators';
import Transform from '../libs/helpers/transform.helper';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private toSearch: Observable<any>[] = [];

  constructor(public http: HttpClient) { }

  getObtener(name: string): Observable<any> {
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name).pipe(
      map((resp: any) => {
        console.log(resp.drinks);
        return Transform.Drinks(resp.drinks);
      }))
  }

  getPokemon(): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/charizard').pipe(
      map((resCharacteristics: any) => {
        let characteristics = {
          name: resCharacteristics.name,
          stats: resCharacteristics.stats,
          species: resCharacteristics.species
        }
        console.log('Características: ', characteristics);
        return characteristics;
      }),
      concatMap((resPokemon : any) => {
        return this.getSpecies(resPokemon.species.url, resPokemon)
      }),
      concatMap((resSpecies : any) => {
        return this.getVarieties(resSpecies);
      })
    )
  }

  getSpecies(url: string, original: any): Observable<any> {
    return this.http.get(url).pipe(
      map((resSpecies: any) => {

        (resSpecies.varieties as any[]).forEach(el => {
          this.toSearch.push(this.http.get(el.pokemon.url))
        })
        return {
          ...resSpecies, ...original
        }
      })
    )
  }

  getVarieties(original: any): Observable<any> {
    return merge(this.toSearch).pipe(
      combineLatestAll(),
      map(res => {
        let sprites = res.map(item => {
          return {
            name: item.name,
            img: item.sprites.front_default
          }
        })
        return {
          ...original, sprites: sprites
        }
      })
    )
  }

}
