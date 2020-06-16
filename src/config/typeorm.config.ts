import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: "ec2-184-73-209-230.compute-1.amazonaws.com",
    database: "d47e918nb6of92",
    username: "rllizxndswhdvu",
    password: "221a5706558f9ba624310cef2b9a56e0dedf32f28df8744b3cdeca8b4cb0c6a5",
    port: 5432,
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: true,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
}
