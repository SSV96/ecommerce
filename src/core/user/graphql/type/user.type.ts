import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UserType')
export class UserType {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  createdAt: string;
}
