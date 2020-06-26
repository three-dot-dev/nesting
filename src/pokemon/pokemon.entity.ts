import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
@Entity("pokemon")
export class PokemonEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => String)
    id: string

    @Column("varchar", { length: 500, unique: true })
    name: string

    @Column("varchar", { length: 500 })
    type: string

    @Column("numeric") pokedex: number
}
