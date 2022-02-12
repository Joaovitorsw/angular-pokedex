import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonTextTitleCasePipe',
})
export class PokemonTextTitleCasePipe implements PipeTransform {
  transform(pokemonText: string | undefined | number): string | undefined {
    if (pokemonText === '-') return pokemonText;

    if (pokemonText === 'id' || pokemonText === 'pp')
      return pokemonText.toUpperCase();

    const stringy = pokemonText?.toString();
    const pokemonNameSplit = stringy?.split('-');

    const titleCase = (word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    const pokemonTextTitleCase = pokemonNameSplit?.map((word) =>
      titleCase(word)
    );

    return pokemonTextTitleCase?.join(' ');
  }
}
