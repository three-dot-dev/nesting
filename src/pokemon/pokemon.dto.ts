import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class PokemonDTO {
  @Field() readonly id?: string;
  @Field() readonly name: string;
  @Field() readonly type: string;
  @Field() readonly pokedex: number;
}

@InputType()
export class PokemonInput {
  @Field() readonly name: string;
  @Field() readonly type: string;
  @Field() readonly pokedex: number;
}
