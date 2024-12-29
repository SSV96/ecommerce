import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserCreateInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  phone: string;
  @Field()
  email: string;
}
