
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth-controller';
import { DatabaseModule } from '../../../database/database.module';
import { Env } from '@/core/configs/env';
import { JwtStrategy } from '@/infra/auth/utils/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(configService: ConfigService<Env, true>) {

        const privateKey = configService.get('PRIVATE_KEY', { infer: true});
        const publicKey = configService.get('PUBLIC_KEY', { infer: true});

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy],
})


export class AuthModule {}
