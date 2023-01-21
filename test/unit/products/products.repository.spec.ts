import { Test } from '@nestjs/testing';
import { ProductsRepository } from '../../../src/products/products.repository';
import { Product } from '../../../src/products/entities/product.entity';
import { ProductModel } from './stub/product.model';
import { productStub } from './stub/product.stub';
import { FilterQuery } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('ProductsRepository', () => {
  let productsRepository: ProductsRepository;

  describe('find, findOne, update & delete operations', () => {
    let productModel: ProductModel;
    let productFilterQuery: FilterQuery<Product>;

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        providers: [
          ProductsRepository,
          {
            provide: getModelToken(Product.name),
            useClass: ProductModel,
          },
        ],
      }).compile();

      productsRepository = module.get<ProductsRepository>(ProductsRepository);
      productModel = module.get<ProductModel>(getModelToken(Product.name));
      productFilterQuery = { name: productStub().name };
      jest.clearAllMocks();
    });

    describe('findOne', () => {
      let product: Product;

      beforeEach(async () => {
        jest.spyOn(productModel, 'findOne');
        product = await productsRepository.findOne(productFilterQuery);
      });

      test('then it should call productModel.findOne', () => {
        expect(productModel.findOne).toHaveBeenCalledWith(productFilterQuery, {
          _id: 0,
          __v: 0,
        });
      });

      test('then it should return the product', () => {
        expect(product).toEqual(productStub());
      });
    });

    describe('find', () => {
      let products: Product[];

      beforeEach(async () => {
        jest.spyOn(productModel, 'find');
        products = await productsRepository.find(productFilterQuery);
      });

      test('then it should call productModel.find', () => {
        expect(productModel.find).toHaveBeenCalledWith(productFilterQuery);
      });

      test('then it should return the product', () => {
        expect(products).toEqual([productStub()]);
      });
    });

    describe('remove', () => {
      let product: Product;

      beforeEach(async () => {
        jest.spyOn(productModel, 'findOneAndDelete');
        product = await productsRepository.findOneAndDelete(productFilterQuery);
      });

      test('then it should call productModel.findOneAndDelete', () => {
        expect(productModel.findOneAndDelete).toHaveBeenCalledWith(
          productFilterQuery,
        );
      });

      test('then it should return the product', () => {
        expect(product).toEqual(productStub());
      });
    });

    describe('update', () => {
      let product: Product;

      beforeEach(async () => {
        jest.spyOn(productModel, 'findOneAndUpdate');
        product = await productsRepository.findOneAndUpdate(
          productFilterQuery,
          productStub(),
        );
      });

      test('then it should call productModel.findOneAndUpdate', () => {
        expect(productModel.findOneAndUpdate).toHaveBeenCalledWith(
          productFilterQuery,
          productStub(),
          { new: true },
        );
      });

      test('then it should return the product', () => {
        expect(product).toEqual(productStub());
      });
    });
  });

  describe('create operation', () => {
    beforeEach(async () => {
      const module = await Test.createTestingModule({
        providers: [
          ProductsRepository,
          {
            provide: getModelToken(Product.name),
            useValue: ProductModel,
          },
        ],
      }).compile();

      productsRepository = module.get<ProductsRepository>(ProductsRepository);
    });

    describe('when create is called', () => {
      let product: Product;
      let saveSpy: jest.SpyInstance;
      let constructorSpy: jest.SpyInstance;

      beforeEach(async () => {
        saveSpy = jest.spyOn(ProductModel.prototype, 'save');
        constructorSpy = jest.spyOn(ProductModel.prototype, 'constructorSpy');

        product = await productsRepository.create(productStub());
      });

      test('then it should call productModel', () => {
        expect(saveSpy).toHaveBeenCalled();
        expect(constructorSpy).toHaveBeenCalledWith(productStub());
      });

      test('then it should return a product', () => {
        expect(product).toEqual(productStub());
      });
    });
  });
});
