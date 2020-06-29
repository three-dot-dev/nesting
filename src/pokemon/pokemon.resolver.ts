import { Resolver, Mutation, Args, Query, Context } from "@nestjs/graphql"
import { Inject, UseGuards } from "@nestjs/common"

import { PokemonService } from "./pokemon.service"
import { PokemonDTO, PokemonInput } from "./pokemon.dto"
import { PokemonEntity } from "./pokemon.entity"

import { AuthGuard } from "../user/user.guard"
import { UserEntity } from "user/user.entity"

@Resolver(() => PokemonEntity)
export class PokemonResolver {
    constructor(@Inject(PokemonService) private pokemonService: PokemonService) {}

    @Mutation(() => PokemonDTO)
    @UseGuards(new AuthGuard())
    // @TODO change user type from UserEntity to JwtPayload
    async createPokemon(@Args("data") data: PokemonInput, @Context("user") user: UserEntity): Promise<PokemonEntity> {
        let pokemon = await this.pokemonService.getPokemonByName(data.name)
        if (!pokemon) {
            pokemon = await this.pokemonService.createPokemon({ ...data }, user.id)
        }
        return pokemon
    }

    @Query(() => [PokemonEntity])
    @UseGuards(new AuthGuard())
    // @TODO change user type from UserEntity to JwtPayload
    async getPokemonsByOwnerId(@Context("user") user: UserEntity): Promise<PokemonEntity[]> {
        return this.pokemonService.getPokemonByOwnerId(user.id)
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
