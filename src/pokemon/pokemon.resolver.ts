import { Resolver, Mutation, Args, Query } from "@nestjs/graphql"
import { Inject, UseGuards } from "@nestjs/common"

import { PokemonService } from "./pokemon.service"
import { PokemonDTO, PokemonInput } from "./pokemon.dto"
import { PokemonEntity } from "./pokemon.entity"

import { AuthGuard } from "../user/user.guard"

@Resolver(() => PokemonEntity)
export class PokemonResolver {
    constructor(@Inject(PokemonService) private pokemonService: PokemonService) {}

    @Mutation(() => PokemonDTO)
    @UseGuards(new AuthGuard())
    async createPokemon(@Args("data") data: PokemonInput): Promise<PokemonEntity> {
        let pokemon = await this.pokemonService.getPokemonByName(data.name)
        if (!pokemon) {
            pokemon = await this.pokemonService.createPokemon({ ...data })
        }
        return pokemon
    }

    @Query(() => [PokemonDTO])
    async getPokemons(): Promise<PokemonEntity[]> {
        return await this.pokemonService.getPokemons()
    }

    @Query(() => PokemonDTO)
    async selectPokemonById(@Args("id") id: string): Promise<PokemonEntity> {
        return await this.pokemonService.getPokemonById(id)
    }
}
