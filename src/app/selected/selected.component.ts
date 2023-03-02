import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Pokemon, PokemonService, } from '../services/pokemon.service';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit, OnDestroy {

  @Output() close = new EventEmitter();
  @Input() url?: string;

  private ngUnsubscribe = new Subject<void>();
  
  public image: string = '';
  public id: number = 0;
  public name: string = '';
  public types: string[] =[];
  public attack: number = 0;
  public defense: number = 0;
  public hp: number = 0;
  public sp_attack: number = 0;
  public sp_defense: number = 0;
  public speed: number = 0;
  public weight: number = 0;
  public total_moves: number = 0;



  constructor(public poke_service: PokemonService) { }


  public ngOnInit(): void {
    this.poke_service.getPokemon(this.url!)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Pokemon) => {
        this.image = res.sprites.front_default;
        this.id = res.id;
        this.name = res.name;
        this.types = res.types.map((type: any) => type.type.name);
        [this.attack, this.defense, this.hp, this.sp_attack, this.sp_defense, this.speed] = res.stats.map((stat: any) =>  stat.base_stat);
        this.weight = res.weight;
        this.total_moves = res.moves.length;
      });
  }


  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
