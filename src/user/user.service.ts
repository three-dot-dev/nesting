import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { UserModel } from "./user.model"
import { UserDTO } from "./user.dto"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserModel)
        private usersRepository: Repository<UserModel>
    ) {}

    findAll(): Promise<UserModel[]> {
        return this.usersRepository.find()
    }

    async create(data: UserDTO): Promise<UserModel> {
        const user = new UserModel()
        user.name = data.name
        user.email = data.email
        user.password = data.password

        await this.usersRepository.save(user)

        return user
    }
}
