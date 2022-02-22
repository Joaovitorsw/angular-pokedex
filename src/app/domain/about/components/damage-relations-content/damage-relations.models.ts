export interface DamageRelations {
  id: number;
  name: string;
  damage_relations: TypeDamages;
  move_damage_class?: string | null;
}
export interface TypeDamages {
  double_damage_from?: string[];
  double_damage_to?: string[];
  half_damage_from?: string[];
  half_damage_to?: string[];
  no_damage_from?: string[];
  no_damage_to?: string[];
}
