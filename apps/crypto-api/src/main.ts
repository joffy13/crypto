import { useContainer } from '@nestjs/class-validator';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { MyLogger } from '@app/common/config/logger';
import { CommonModule } from '@app/common/common.module';
import { GraphqlFilterInterceptor } from '@app/common/interceptors/graphql-filter.interceptor';

// import { SchemaService } from '@app/common/services/schema.service';
import { PrismaService } from '@app/common/services/prisma.service';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: new MyLogger(),
    });

    app.enableCors({
      credentials: true,
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: '*',
    });

    const globalPrefix = 'graphql';
    const configService = app.get(ConfigService);
    // const schemaService = app.get(SchemaService);
    const prismaService = app.get(PrismaService);
    // await schemaService.generateSchema();
    await prismaService.enableShutdownHooks(app);
    useContainer(app.select(CommonModule), {
      fallback: true,
      fallbackOnErrors: true,
    });

    app.setGlobalPrefix(globalPrefix, {
      exclude: ['add this merchant uri'],
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    app.useGlobalInterceptors(new GraphqlFilterInterceptor());
    const port = configService.get('APP_PORT', 8080);
    const host = configService.get('APP_HOST', '127.0.0.1');
    await app.listen(port, host);
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
  } catch (error) {
    Logger.error(`❌ Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
  }
}

bootstrap().catch((e) => {
  Logger.error(`❌ Error starting server, ${e}`, '', 'Bootstrap', false);
  throw e;
});
