import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, {
    nullable: true,
  })
  id: string;

  @Field(() => String, {
    nullable: true,
  })
  username: string;

  @Field(() => String, {
    nullable: true,
  })
  email: string;

  @Field(() => String, {
    nullable: true,
  })
  first_name: string;

  @Field(() => String, {
    nullable: true,
  })
  surname: string;

  @Field(() => String, {
    nullable: true,
  })
  bank?: string;

  @Field(() => String, {
    nullable: true,
  })
  crypto_wallet?: string;

  @Field(() => Boolean, {
    defaultValue: false,
  })
  accept_aml?: boolean;
}
