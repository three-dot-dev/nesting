import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { Inject, UseGuards } from "@nestjs/common"

import { UserService } from "./user.service"
import { UserEntity } from "./user.entity"
import { UserInput } from "./user.dto"

import { CurrentUser } from "./user.decorator"
import { GqlAuthGuard } from "../auth/auth.guard"

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

    @Query(() => UserEntity)
    @UseGuards(GqlAuthGuard)
    getUserById(@CurrentUser() user: UserEntity): Promise<UserEntity> {
        return this.userService.findById(user.id)
    }

    @Mutation(() => UserEntity)
    async createUser(@Args("user") user: UserInput): Promise<UserEntity> {
        return await this.userService.create(user)
    }
}
