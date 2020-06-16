import { ObjectType, Field } from "@nestjs/graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@ObjectType()
@Entity()
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
}
