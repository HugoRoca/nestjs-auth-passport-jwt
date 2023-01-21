import { Product } from '../../../../src/products/entities/product.entity';

export const productStub = (): Product => {
  return {
    name: 'Product name',
    description: 'Product description',
    price: 100,
    stock: 10,
    image: 'Product image',
    category: {
      name: 'Category name',
      image: 'Category image',
    },
  };
};
