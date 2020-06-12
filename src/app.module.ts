import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'kuetabby',
    //   database: 'nest',
    //   entities: ['dist/**/*.model.js'],
    //   synchronize: false,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
