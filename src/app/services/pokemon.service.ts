import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private colors: Object = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };


  constructor(private http: HttpClient) { }

  public getData(n: number, offset: number): Observable<Object> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/?limit=${n}&offset=${offset}`);
  };

  public getPokemon(url: string): Observable<Object> {
    return this.http.get(url);
  };

  
  public getColor(c: string): string {
    return this.colors[c as keyof typeof this.colors].toString()
  }

  public getTypes(): string[] {
    return Object.keys(this.colors);
  }

}
