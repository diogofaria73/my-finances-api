import { PrismaService } from '@/infra/database/service/prisma.service';
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class ListUsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/list')
  async handle() {
    const users = await this.prisma.user.findMany();

    return { users };
  }
}
