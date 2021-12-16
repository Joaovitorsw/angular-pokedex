import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonTitleCase',
})
export class PokemonTitleCasePipe implements PipeTransform {
  transform(pokemonName: string | undefined): string | undefined {
    const pokemonNameSplit = pokemonName?.split('-');

    const titleCase = (word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    const pokemonNameTitleCase = pokemonNameSplit?.map((word) =>
      titleCase(word)
    );

    return pokemonNameTitleCase?.join(' ');
  }
}
