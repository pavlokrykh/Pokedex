import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Pokemon, PokemonService, PokemonType } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit, OnDestroy {

  @Input() url?: string;
  @Output() sendPokemon = new EventEmitter<string>();

  private ngUnsubscribe = new Subject<void>();
  
  public image: string = '';
  public name: string = '';
  public types: string[] = [];


  constructor(public poke_service: PokemonService) { };

  public ngOnInit(): void {
    this.poke_service.getPokemon(this.url!)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Pokemon) => {
        this.image = res.sprites.front_default;
        this.name = res.name;
        this.types = res.types.map((type: PokemonType) => type.type.name);
      });
  }

  public open(): void {
    this.sendPokemon.emit(this.url);
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
