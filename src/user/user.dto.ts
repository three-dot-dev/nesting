import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserDTO {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  phone: string;
  @Field()
  password: string;
}
