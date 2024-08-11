import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { CommonModule } from '@app/common/common.module';

import { RedisModule } from '@nestjs-modules/ioredis';
// import { ClientsModule } from '@nestjs/microservices';
// import { kafkaConfig } from '@app/common/config/kafka.config';
import { CurrenciesModule } from './core/currencies/currencies.module';
import { UserModule } from './core/user/user.module';

@Global()
@Module({
  imports: [
    // ClientsModule.register({ clients: kafkaConfig }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule.forRoot({
      url: process.env.REDIS_URL,
      type: 'single',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req, res }) => ({ req, res }),
      driver: ApolloDriver,
      autoSchemaFile: true,
      fieldResolverEnhancers: ['guards', 'interceptors'],
      introspection: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    }),
    CommonModule,
    CurrenciesModule,
    ConfigModule,
    UserModule,
  ],
  controllers: [],
  exports: [],
})
export class AppModule {}
