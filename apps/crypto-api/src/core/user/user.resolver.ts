import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { User } from './entities/user.type';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(
    @Args()
    args: CreateUserInput,
    // @Args('id', { type: () => Int }) id: number,
  ) {
    console.log(args);
    return this.userService.create(args);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    console.log(id);
    return this.userService.findOne(id);
  }
}
