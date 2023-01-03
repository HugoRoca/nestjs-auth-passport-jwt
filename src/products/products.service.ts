import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  create(data: CreateProductDto) {
    return this.productRepository.create(data);
  }

  findAll() {
    return this.productRepository.find({});
  }

  findOne(id: string) {
    const product = this.productRepository.findOne({ id });

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not exists.`);

    return product;
  }

  update(id: string, data: UpdateProductDto) {
    const product = this.productRepository.findOneAndUpdate({ id }, data);

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not exists.`);

    return product;
  }

  remove(id: string) {
    return this.productRepository.findOneAndDelete({ id });
  }
}
