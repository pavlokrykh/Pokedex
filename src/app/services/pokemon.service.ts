import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonResponse {
  results: PokemonListItem[];
  count: number;
  next: string;
}

export interface PokemonType {
  slot: number;
  type: {
      name: string;
  }
}

export interface PokemonSprite {
  front_default: string;
}

export interface PokemonStats {
  base_stat: number;
  stat: {
    name: string;
  }
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprite;
  types: PokemonType[];
  stats: PokemonStats[];
  weight: number;
  moves: {
    length: number;
  }
}


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

  public getData(n: number, offset: number): Observable<PokemonResponse[]> {
    return this.http.get<PokemonResponse[]>(`https://pokeapi.co/api/v2/pokemon/?limit=${n}&offset=${offset}`);
  }

  public getPokemon(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  public getColor(c: string): string {
    return this.colors[c as keyof typeof this.colors].toString()
  }

  public getTypes(): string[] {
    return Object.keys(this.colors);
  }

}
