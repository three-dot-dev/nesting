import {
    ExecutionContext,
    Injectable,
    CanActivate,
    HttpException,
    HttpStatus,
    Inject,
    InternalServerErrorException,
    UnauthorizedException
} from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
// import { AuthGuard } from '@nestjs/passport';
import * as jwt from "jsonwebtoken"
import { JwtPayloadDto } from "./jwt_payload.dto"
import { UserService } from "./user.service"

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(UserService) private userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<any> {
        const ctx = GqlExecutionContext.create(context).getContext()

        if (!ctx.headers.authorization) {
            return false
        }

        const jwtPayload = (await this.validateToken(ctx.headers.authorization)) as JwtPayloadDto
        try {
            const user = this.userService.findOneById(jwtPayload.id)
            if (!user) {
                throw new UnauthorizedException()
            }
            ctx.user = user
        } catch (e) {
            throw new InternalServerErrorException()
        }
        return true
    }

    async validateToken(auth: string): Promise<any> {
        if (auth.split(" ")[0] !== "Bearer") {
            throw new HttpException("Invalid Token", HttpStatus.UNAUTHORIZED)
        }

        const token = auth.split(" ")[1]
        try {
            return await jwt.verify(token, "secret")
        } catch (error) {
            throw new HttpException("Invalid Token", HttpStatus.UNAUTHORIZED)
        }
    }
}
