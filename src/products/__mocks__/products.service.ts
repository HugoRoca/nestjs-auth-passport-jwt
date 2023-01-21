import { productStub } from '../../../test/unit/products/stub/product.stub';

export const ProductsService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(productStub()),
  findAll: jest.fn().mockReturnValue([productStub()]),
  findOne: jest.fn().mockReturnValue(productStub()),
  update: jest.fn().mockReturnValue(productStub()),
  remove: jest.fn().mockReturnValue(productStub()),
});
