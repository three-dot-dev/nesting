import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { UserService } from './user.service';
import { UserModel } from './user.model';
import { UserDTO } from './user.dto';

@Resolver(of => UserModel)
export class UserResolver {
  constructor(
    @Inject(UserService)
    private userService: UserService,
  ) {}

  @Query(returns => [UserModel])
  async getUsers(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }

  @Mutation(returns => UserModel)
  async createUser(@Args('user') user: UserDTO): Promise<UserModel> {
    return await this.userService.create(user);
  }
}
