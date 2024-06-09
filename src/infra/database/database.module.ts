import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/concrete/user/prisma-users-repository';

@Module({
  imports: [],
  providers: [PrismaService, PrismaUsersRepository],
  exports: [PrismaService],
})
export class DatabaseModule {}
