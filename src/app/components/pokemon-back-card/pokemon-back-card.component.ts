import { Component, Input, OnInit } from '@angular/core';
import { DAMAGE_RELATIONS } from 'app/pages/home/home.page-damage-relations';
import { Pokemon } from 'poke-api-models';

interface ResumedDamageRelations {
  name: string | undefined;
  double_damage_from: string[] | undefined;
  half_damage_from: string[] | undefined;
}

@Component({
  selector: 'px-pokemon-back-card',
  templateUrl: './pokemon-back-card.component.html',
  styleUrls: ['./pokemon-back-card.component.scss'],
})
export class PokemonBackCardComponent implements OnInit {
  constructor() {}
  @Input() pokemon: Pokemon;
  damageRelations: ResumedDamageRelations[];
  oneWeakness: boolean;
  teste = ['fire', 'water', 'grass'];

  ngOnInit(): void {
    const damageRelations = this.pokemon.types.map((type) => {
      return DAMAGE_RELATIONS.find(
        (damageRelations) => damageRelations.name === type.type.name
      );
    });

    const damageRelationsPokemon = damageRelations.map((damageRelations) => {
      const damage_relations = damageRelations?.damage_relations!;

      const double_damage_from = damage_relations.double_damage_from?.map(
        (weakness: string) => weakness
      );
      const half_damage_from = damage_relations.half_damage_from?.map(
        (weakness: string) => weakness
      );

      return {
        name: damageRelations?.name,
        double_damage_from,
        half_damage_from,
      };
    });
    this.damageRelations = damageRelationsPokemon;
    this.oneWeakness = damageRelationsPokemon.length < 2;
  }
}
