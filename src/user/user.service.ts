import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import * as jwt from "jsonwebtoken"

import { UserEntity } from "./user.entity"
import { UserDTO } from "./user.dto"
import { JwtPayloadDto } from "./jwt_payload.dto"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    createToken(id: string, email: string): { accessToken: string } {
        const jwtPayload: JwtPayloadDto = {
            id,
            email
        }

        const accessToken = jwt.sign(jwtPayload, "secret", { expiresIn: 36000 })
        return { accessToken: `Bearer ${accessToken}` }
    }

    findOneById(userId: string): Promise<UserEntity> {
        return this.usersRepository.findOne(userId)
    }

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find()
    }

    findByName(name: string): Promise<UserEntity> {
        return this.usersRepository.findOne({ name })
    }

    findByEmail(email: string): Promise<UserEntity> {
        return this.usersRepository.findOne({ email })
    }

    create(data: UserDTO): Promise<UserEntity> {
        return this.usersRepository.create({ ...data }).save()
    }
}
