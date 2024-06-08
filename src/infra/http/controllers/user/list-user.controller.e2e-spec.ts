import { AppModule } from '@/infra/nest/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('List User (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  test('[GET] /users/list', async () => {
    const response = await request(app.getHttpServer()).get('/users/list');

    expect(response.statusCode).toBe(200);
  });
});
