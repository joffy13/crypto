import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class CurrencyConstant {
  @Field(() => String, {
    nullable: true,
  })
  name?: string;

  @Field(() => String, {
    nullable: true,
  })
  symbol?: string;

  @Field(() => String, {
    nullable: true,
  })
  slug?: string;

  @Field(() => ID, {
    nullable: true,
  })
  id?: string;

  @Field(() => Number, {
    nullable: true,
  })
  exchange_min?: number;

  @Field(() => Number, {
    nullable: true,
  })
  exchange_max?: number;

  @Field(() => String, {
    nullable: true,
  })
  coin_cdn_url?: string;

  @Field(() => String, {
    nullable: true,
  })
  type?: 'FIAT' | 'CRYPTO';

  @Field(() => Date, {
    nullable: true,
  })
  created_at?: Date;
}
