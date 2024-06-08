import { PrismaService } from '@/infra/database/service/prisma.service';
import { AppModule } from '@/infra/nest/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create User (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    // TODO: Try run in this way
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /users/create', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/create')
      .send({
        name: 'User Test',
        email: 'diogofaria073@gmail.com',
        password: 'fadababaca',
      });

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'diogofaria073@gmail.com',
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });
});
