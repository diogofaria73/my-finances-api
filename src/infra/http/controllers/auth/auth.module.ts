import { Env } from '@/configs/env';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth-controller';
import { DatabaseModule } from '../../../database/database.module';
import { JwtStrategy } from '../../auth/utils/jwt.strategy';
import { inflate, inflateRaw } from 'zlib';

@Module({
  imports: [
    PassportModule,
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService<Env, true>) {

        const privateKey = configService.get('PRIVATE_KEY', { infer: true});
        const publicKey = configService.get('PUBLIC_KEY', { infer: true});

        return {
          signOptions: { algorithm: 'RS256' },
          // secret: Buffer.from(privateKey, 'base64'),
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
