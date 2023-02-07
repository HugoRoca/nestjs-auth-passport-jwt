import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';
import { productStub } from '../unit/products/stub/product.stub';

import { AppModule } from '../../src/app.module';
import { DatabaseService } from '../../src/database/Database.service';
import { CreateProductDto } from '../../src/products/dto/create-product.dto';
import exp from 'constants';

describe('ProductsControllers', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDBHandle();

    httpServer = app.getHttpServer();

    token = await login();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('products').deleteMany({});
  });

  const login = async () => {
    const response = await request(httpServer).post('/auth').send({
      username: 'hugo.roca',
      password: '123456',
    });

    return response.body.access_token;
  };

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      await dbConnection.collection('products').insertOne(productStub());
      const response = await request(httpServer)
        .get('/products')
        .set('Authorization', `bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([productStub()]);
    });
  });

  describe('createProducts', () => {
    it('should a create product', async () => {
      const createProductDtoRequest: CreateProductDto = {
        name: productStub().name,
        description: productStub().description,
        price: productStub().price,
        stock: productStub().stock,
        image: productStub().image,
        category: {
          name: productStub().category.name,
          image: productStub().category.image,
        },
      };

      const response = await request(httpServer)
        .post('/products')
        .set('Authorization', `bearer ${token}`)
        .send(createProductDtoRequest);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createProductDtoRequest);

      const product = await dbConnection.collection('products').findOne({
        name: createProductDtoRequest.name,
      });

      expect(product).toMatchObject(createProductDtoRequest);
    });
  });
});
