import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModel } from './user.model';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) {}

  findAll(): Promise<UserModel[]> {
    return this.usersRepository.find();
  }

  async create(user: UserDTO): Promise<UserModel> {
    return await this.usersRepository.save({
      ...user,
    });
  }
}
