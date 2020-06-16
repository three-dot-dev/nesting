import { TypeOrmModule } from "@nestjs/typeorm"
import { Module } from "@nestjs/common"

import { UserService } from "./user.service"
import { UserResolver } from "./user.resolver"
import { UserEntity } from "./user.entity"

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService, UserResolver],
    exports: [UserService]
})
export class UserModule {}
