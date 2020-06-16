import { ObjectType, Field, Int } from "@nestjs/graphql"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@ObjectType()
@Entity()
export class UserModel {
    @PrimaryGeneratedColumn("uuid")
    @Field(type => String)
    id: string

    @Column("varchar", { length: 500, unique: true, nullable: true })
    email: string

    @Column("varchar", { length: 500, nullable: true })
    password: string

    @Column("varchar", { length: 500, nullable: true })
    name?: string
}
