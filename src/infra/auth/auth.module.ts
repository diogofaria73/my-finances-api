import { Env } from "@/configs/env";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "../http/controllers/auth/auth-controller";
import { PrismaService } from "../database/service/prisma.service";
import { JwtStrategy } from "./utils/jwt.strategy";

@Module({
      imports: [
            PassportModule,
            JwtModule.registerAsync({
                  useFactory(configService: ConfigService<Env, true>) {
                        const privateKey = configService.get('PRIVATE_KEY')
                        const publicKey = configService.get('PUBLIC_KEY')

                        return {
                              signOptions: { algorithm: 'RS256', expiresIn: configService.get('JWT_EXPIRES_IN') },
                              privateKey: Buffer.from(privateKey, 'base64'),
                              publicKey: Buffer.from(publicKey, 'base64')
                        }
                  }
            })
      ],
      controllers: [AuthController],
      providers: [PrismaService, JwtStrategy]
})

export class AuthModule {}