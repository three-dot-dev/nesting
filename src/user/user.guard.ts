import { ExecutionContext, Injectable, CanActivate, HttpException, HttpStatus } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
// import { AuthGuard } from '@nestjs/passport';
import * as jwt from "jsonwebtoken"

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<any> {
        const ctx = GqlExecutionContext.create(context).getContext()

        if (!ctx.headers.authorization) {
            return false
        }

        ctx.user = await this.validateToken(ctx.headers.authorization)
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
