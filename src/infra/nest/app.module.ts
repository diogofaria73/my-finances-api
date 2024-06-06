import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../database/service/prisma.service';
import { envSchema } from '@/configs/env';
import { HttpModule } from '../http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [],
})
export class AppModule {}
