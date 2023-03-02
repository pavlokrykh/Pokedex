import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit, OnDestroy {

  @Output() close = new EventEmitter();
  @Input() url?: string;

  private ngUnsubscribe = new Subject<void>();
  
  public image?: string;
  public id?: number;
  public name?: string;
  public types?: string[];
  public attack?: number;
  public defense?: number;
  public hp?: number;
  public sp_attack?: number;
  public sp_defense?: number;
  public speed?: number;
  public weight?: number;
  public total_moves?: number;



  constructor(public poke_service: PokemonService) { }


  public ngOnInit(): void {
    this.poke_service.getPokemon(this.url!)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        this.image = res.sprites.front_default;
        this.id = res.id;
        this.name = res.name;
        this.types = res.types.map((type: any) => type.type.name);
        [this.attack, this.defense, this.hp, this.sp_attack, this.sp_defense, this.speed] = res.stats.map((stat: any) =>  stat.base_stat);
        this.weight = res.weight;
        this.total_moves = res.moves.length;
      });
  };


  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  };


}
