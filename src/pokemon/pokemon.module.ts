import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PokemonEntity } from './pokemon.entity';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonEntity])],
  providers: [PokemonResolver, PokemonService],
  exports: [PokemonService],
})
export class PokemonModule {}
