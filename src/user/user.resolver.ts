import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql"
import { Inject, UseGuards } from "@nestjs/common"

import { UserService } from "./user.service"
import { UserEntity } from "./user.entity"
import { UserInput, UserDTO } from "./user.dto"

// import { CurrentUser } from "./user.decorator"
import { AuthGuard } from "./user.guard"

@Resolver(() => UserEntity)
export class UserResolver {
    constructor(
        @Inject(UserService)
        private userService: UserService
    ) {}

    @Query(() => UserEntity)
    @UseGuards(new AuthGuard())
    async getUser(@Context("user") user: UserEntity): Promise<UserEntity> {
        return this.userService.findOneById(user.id)
    }

    @Query(() => [UserDTO])
    async getUsers(): Promise<UserEntity[]> {
        return await this.userService.findAll()
    }

    // @Query(() => UserDTO)
    // async getUserByName(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    //     return await this.userService.findByName(user.name)
    // }

    @Mutation(() => String)
    async loginUser(@Args("data") data: UserInput): Promise<string> {
        let user = await this.userService.findByEmail(data.email)
        if (!user) {
            user = await this.userService.create({ ...data })
        }
        return this.userService.createToken(user)
    }
}
