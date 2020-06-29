import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { ObjectType, Field } from "@nestjs/graphql"
import { UserEntity } from "user/user.entity"

@ObjectType()
@Entity("pokemon")
export class PokemonEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => String)
    id: string

    @Column("varchar", { length: 500 })
    name: string

    @Column("varchar", { length: 500 })
    type: string

    @Column("numeric") pokedex: number

    @ManyToOne(
        () => UserEntity,
        user => user.pokemons,
        {
            eager: false,
            onDelete: "CASCADE"
        }
    )
    owner: UserEntity

    @Column({ nullable: false })
    ownerId: string
}
