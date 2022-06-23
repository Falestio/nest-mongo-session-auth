import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      name: 'sid',
      secret: 'ykstd53Sdf6si76dsfIA6sf66f76fsi6dfsvYSKsf6KSfs58s6aASFV',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: true,
        // secure: true
      }
    })
  )

  await app.listen(3000);
}
bootstrap();
