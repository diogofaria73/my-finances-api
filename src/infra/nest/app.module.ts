import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '@/configs/env';
import { HttpModule } from '../http/http.module';
import { AuthModule } from '../http/controllers/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
    AuthModule
  ],
  controllers: [],
})
export class AppModule {}
