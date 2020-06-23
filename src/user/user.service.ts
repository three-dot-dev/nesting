import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { UserEntity } from "./user.entity"
import { UserDTO } from "./user.dto"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find()
    }

    findById(id: string): Promise<UserEntity> {
        return this.usersRepository.findOne(id)
    }

    async create(data: UserDTO): Promise<UserEntity> {
        const user = new UserEntity()
        user.name = data.name
        user.email = data.email
        user.password = data.password

        await this.usersRepository.save(user)

        return user
    }
}
