import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { UserType } from './type/user.type';
import { UserCreateInput } from './input/user.create.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserType)
  async signUp(@Args('userCreateInput') userCreateInput: UserCreateInput) {
    return this.userService.signUp(userCreateInput);
  }
  @Query(() => UserType)
  user(@Args('email') email: string) {
    return this.userService.findByEmail(email);
  }
}
