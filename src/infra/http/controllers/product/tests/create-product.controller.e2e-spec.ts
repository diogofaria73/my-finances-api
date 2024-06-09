import { PrismaService } from '@/infra/database/prisma.service';
import { AppModule } from '@/infra/nest/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create Product (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /products/create', async () => {
    const response = await request(app.getHttpServer())
      .post('/products/create')
      .send({
        name: 'Product Test',
        description: 'Product Test Description',
        price: 100,
      });

    expect(response.statusCode).toBe(201);

    const productInDatabase = await prisma.product.findFirst({
      where: {
        name: 'Product Test',
      },
    });

    expect(productInDatabase).toBeTruthy();
  });

  afterAll(async () => {});
}); // Add this closing curly brace
