import { Test } from '@nestjs/testing';
import { ProductsController } from '../../../src/products/products.controller';
import { ProductsService } from '../../../src/products/products.service';
import { Product } from '../../../src/products/entities/product.entity';
import { productStub } from './stub/product.stub';
import { CreateProductDto } from '../../../src/products/dto/create-product.dto';
import { UpdateProductDto } from '../../../src/products/dto/update-product.dto';

jest.mock('../../../src/products/products.service');

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    let product: Product;

    beforeEach(async () => {
      product = await productsController.findOne(productStub().name);
    });

    test('then it should call productsService.findOne', () => {
      expect(productsService.findOne).toBeCalledWith(productStub().name);
    });

    test('then it should return the product', () => {
      expect(product).toEqual(productStub());
    });
  });

  describe('findAll', () => {
    let products: Product[];

    beforeEach(async () => {
      products = await productsController.findAll();
    });

    test('then it should call productsService.findAll', () => {
      expect(productsService.findAll).toBeCalled();
    });

    test('then it should return the product', () => {
      expect(products).toEqual([productStub()]);
    });
  });

  describe('create', () => {
    let product: Product;

    beforeEach(async () => {
      const data: CreateProductDto = {
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

      product = await productsController.create(data);
    });

    test('then it should call productsService.create', () => {
      expect(productsService.create).toBeCalledWith(productStub());
    });

    test('then it should return the product', () => {
      expect(product).toEqual(productStub());
    });
  });

  describe('update', () => {
    let product: Product;

    beforeEach(async () => {
      const data: UpdateProductDto = {
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

      product = await productsController.update(productStub().name, data);
    });

    test('then it should call productsService.update', () => {
      expect(productsService.update).toBeCalledWith(
        productStub().name,
        productStub(),
      );
    });

    test('then it should return the product', () => {
      expect(product).toEqual(productStub());
    });
  });

  describe('remove', () => {
    let product: Product;

    beforeEach(async () => {
      product = await productsController.remove(productStub().name);
    });

    test('then it should call productsService.remove', () => {
      expect(productsService.remove).toBeCalledWith(productStub().name);
    });

    test('then it should return the product', () => {
      expect(product).toEqual(productStub());
    });
  });
});
