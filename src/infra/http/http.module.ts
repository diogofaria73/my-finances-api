import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './controllers/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './controllers/authentication/auth.module';
import { envSchema } from '@/core/configs/env';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [JwtService],
})
export class HttpModule {}
