import { ObjectType, Field } from "@nestjs/graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { PokemonEntity } from "pokemon/pokemon.entity"

@ObjectType()
@Entity("user")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => String)
    id: string

    @Column("varchar", { length: 500, unique: true, nullable: true })
    email: string

    @Column("varchar", { length: 500, nullable: true })
    password: string

    @Column("varchar", { length: 500, nullable: true })
    name?: string

    @OneToMany(
        () => PokemonEntity,
        pokemon => pokemon.owner,
        {
            eager: true,
            onDelete: "CASCADE"
        }
    )
    pokemons: PokemonEntity[]
}
