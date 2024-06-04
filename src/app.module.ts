import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './configs/env';
import { PrismaService } from './infrastructure/database/service/prisma.service';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
