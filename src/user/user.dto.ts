import { ObjectType, InputType, Field } from "@nestjs/graphql"

@ObjectType()
export class UserDTO {
    @Field() readonly id?: string
    @Field() readonly email: string
    @Field() readonly password: string
    @Field() readonly name?: string
}

@InputType()
export class UserInput {
    @Field() readonly email: string
    @Field() readonly password: string
    @Field() readonly name?: string
}
