import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PokemonEntity } from './pokemon.entity';
import { PokemonInput } from './pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private pokemonRepository: Repository<PokemonEntity>,
  ) {}

  createPokemon(data: PokemonInput): Promise<PokemonEntity> {
    return this.pokemonRepository.create({ ...data }).save();
  }

  getPokemons(): Promise<PokemonEntity[]> {
    return this.pokemonRepository.find();
  }

  getPokemonByName(name: string): Promise<PokemonEntity> {
    return this.pokemonRepository.findOne({ name });
  }

  getPokemonById(id: string): Promise<PokemonEntity> {
    return this.pokemonRepository.findOne({ id });
  }
}
