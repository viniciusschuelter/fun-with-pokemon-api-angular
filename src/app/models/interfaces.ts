export interface User {
  uid?: string;
  name?: string;
  email?: string;
  password?: string;
  joind_date?: Date;
  displayName?: string;
}

export interface Pokemon {
  abilities: PokemonAbility[];
  base_experience: number;
  forms: PokemonMini[];
  game_indices: GenerationGameIndex[];
  height: number;
  held_items: PokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  order: 1;
  species: PokemonMini;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
  date: Date | string;
  favorite_date: Date | string;
}

export interface GenerationGameIndex {
  game_index: number;
  generation: PokemonMini;
}

export interface PokemonMini {
  name: string;
  url: string;
}

export interface PokemonType {
  type: PokemonMini;
  slot: number;
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: PokemonMini;
}

export interface PokemonStat {
  stat: PokemonMini;
  effort: number;
  base_stat: number;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
}

export type SpritesTypes = keyof PokemonSprites;

export enum PokemonTypesEnum {
  bug = 'bug',
  dark = 'dark',
  dragon = 'dragon',
  electric = 'electric',
  fire = 'fire',
  fairy = 'fairy',
  fighting = 'fighting',
  flying = 'flying',
  ghost = 'ghost',
  grass = 'grass',
  ground = 'ground',
  ice = 'ice',
  normal = 'normal',
  poison = 'poison',
  psychic = 'psychic',
  rock = 'rock',
  steel = 'steel',
  water = 'water',
}

export interface PokemonMove {
  move: PokemonMini;
  version_group_details: PokemonMoveVersion[];
}

export interface PokemonMoveVersion {
  version_group: PokemonMini;
  move_learn_method: PokemonMini;
  level_learned_at: number;
}

export interface PokemonHeldItem {
  item: PokemonMini;
  version_details: PokemonHeldItemVersion;
}

export interface PokemonHeldItemVersion {
  version: PokemonMini;
  rarity: number;
}
