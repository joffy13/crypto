import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class CreateUserInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  username?: string;
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  email: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  first_name: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  surname: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  bank?: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  crypto_wallet?: string;

  @IsOptional()
  @Field(() => Boolean, {
    defaultValue: false,
  })
  accept_aml?: boolean;
}
