import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class UserModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Field(type => Date)
  // @CreateDateColumn()
  // createdAt: Date;

  // updatedAt: Date;

  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  phone: string;
  @Field()
  password: string;
}
