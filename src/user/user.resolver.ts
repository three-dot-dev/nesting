import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { Inject } from "@nestjs/common"

import { UserService } from "./user.service"
import { UserEntity } from "./user.entity"
import { UserInput } from "./user.dto"

@Resolver(() => UserEntity)
export class UserResolver {
    constructor(
        @Inject(UserService)
        private userService: UserService
    ) {}

    @Query(() => [UserEntity])
    async getUsers(): Promise<UserEntity[]> {
        return await this.userService.findAll()
    }

    @Mutation(() => UserEntity)
    async createUser(@Args("user") user: UserInput): Promise<UserEntity> {
        return await this.userService.create(user)
    }
}
