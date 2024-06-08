import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './controllers/auth/auth-controller';
import { JwtService } from '@nestjs/jwt';
import { ProductModule } from './controllers/product/product.module';
import { UserModule } from './controllers/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '@/configs/env';
import { AuthModule } from './controllers/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    ProductModule,
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
