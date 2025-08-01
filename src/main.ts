import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './common/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    disableErrorMessages: false,
    validateCustomDecorators: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
