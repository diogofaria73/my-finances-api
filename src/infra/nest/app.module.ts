import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '../http/http.module';
import { AuthModule } from '../http/controllers/authentication/auth.module';
import { envSchema } from '@/core/configs/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
