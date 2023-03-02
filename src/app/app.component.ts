import { AfterViewInit, Component, OnDestroy,  OnInit,  QueryList,  ViewChildren } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PokemonService } from './services/pokemon.service';
import { PokemonComponent } from './pokemon/pokemon.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren(PokemonComponent) allPokemons?: QueryList<PokemonComponent>;

  private ngUnsubscribe = new Subject<void>();

  private number: number = 12;
  private offset: number = 0;
  public title = 'Pokedex';
  public pokemons: any[] = [];
  public pokemon: any[] = [];
  public selected_type: any;
  private loadedPokemons: Object[] = [];
  private loadedComponents: QueryList<PokemonComponent> = this.allPokemons!;

  constructor(public poke_service: PokemonService) { };
  

  ngOnInit(): void {
    this.getPokemons(this.number, this.offset);
  };

  
  ngAfterViewInit(): void {
    this.allPokemons?.changes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(t => {
        if(t.length == this.offset + this.number) {
          this.loadedComponents = t.map((e:any)=>e);
          this.loadedPokemons = this.pokemons;
        } 
      });
  };


  private getPokemons(n: number, offset: number): void {
    this.poke_service.getData(n, offset)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        this.pokemons.push(...res.results);
      });
    
  };

  public loadMore(): void {
    this.offset += 12;
    this.selected_type = 'none';
    this.pokemons = this.loadedPokemons!;
    this.getPokemons(this.number, this.offset);
  };

  public open_pokemon(url: string): void{
    if (this.pokemon[0] != url) {
      this.pokemon.push(url);
      if (this.pokemon.length > 1) this.pokemon.shift();

    } else this.pokemon.shift();
  };


  public sort_types(): void {
    if (this.selected_type != 'none') {
      this.pokemons = this.loadedComponents?.filter(poke => poke.types!.includes(this.selected_type)).map((poke: any) => poke = {name: poke.name, url: poke.url} )!;
    } else {
      this.pokemons = this.loadedPokemons!;
    }
  }

  
  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  };

  

}
