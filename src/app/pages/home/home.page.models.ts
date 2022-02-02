export interface DefaultUser {
  search: string;
  generation: {
    selected: string;
    from: number;
    to: number;
  };
  filters: UsersFilters;
  scroll: number;
  morePokemons: boolean;
}

export interface UsersFilters {
  sort: string;
  height: number | undefined;
  weight: number | undefined;
  type: string | undefined;
  weakness: string | undefined;
}

export enum eGenerations {
  GENERATION_1 = 'generation-1',
  GENERATION_2 = 'generation-2',
  GENERATION_3 = 'generation-3',
  GENERATION_4 = 'generation-4',
  GENERATION_5 = 'generation-5',
  GENERATION_6 = 'generation-6',
  GENERATION_7 = 'generation-7',
  GENERATION_8 = 'generation-8',
  CUSTOM_GENERATION = 'custom-generation',
}

export const GENERATIONS: { [key: string]: { from: number; to: number } } = {
  'generation-1': { from: 1, to: 151 },
  'generation-2': { from: 152, to: 251 },
  'generation-3': { from: 252, to: 386 },
  'generation-4': { from: 387, to: 494 },
  'generation-5': { from: 495, to: 649 },
  'generation-6': { from: 650, to: 721 },
  'generation-7': { from: 722, to: 809 },
  'generation-8': { from: 810, to: 898 },
};

export const userGeneration: DefaultUser = {
  search: '',
  generation: {
    selected: eGenerations.GENERATION_1,
    from: GENERATIONS[eGenerations.GENERATION_1].from,
    to: GENERATIONS[eGenerations.GENERATION_1].to,
  },
  filters: {
    sort: 'ascending',
    type: undefined,
    weight: undefined,
    height: undefined,
    weakness: undefined,
  },
  scroll: 0,
  morePokemons: false,
};

export enum eSort {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}
