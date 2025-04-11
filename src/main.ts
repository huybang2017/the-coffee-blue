import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'src/utils/exception-filter/http-exception.filter';
import { SuccessInterceptor } from 'src/utils/exception-filter/success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
