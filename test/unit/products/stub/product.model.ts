import { MockModel } from '../../database/mock.model';
import { Product } from '../../../../src/products/entities/product.entity';
import { productStub } from './product.stub';

export class ProductModel extends MockModel<Product> {
  protected entityStub = productStub();
}
