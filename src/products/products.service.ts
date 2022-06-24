import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  create(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    const product = this.productModel.findById(id).exec();

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not exists.`);

    return product;
  }

  update(id: string, data: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(
        id,
        {
          $set: data,
        },
        { new: true },
      )
      .exec();

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not exists.`);

    return product;
  }

  remove(id: string) {
    return this.productModel.findByIdAndRemove(id).exec();
  }
}
