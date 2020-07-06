import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { PokemonEntity } from "./pokemon.entity"
import { PokemonResolver } from "./pokemon.resolver"
import { PokemonService } from "./pokemon.service"
import { UserModule } from "user/user.module"

@Module({
    imports: [TypeOrmModule.forFeature([PokemonEntity]), UserModule],
    providers: [PokemonResolver, PokemonService],
    exports: [PokemonService]
})
export class PokemonModule {}
