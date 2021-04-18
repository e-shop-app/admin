import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async insert(
    title: string,
    description: string,
    image: string,
    price: number,
  ): Promise<{ id: number }> {
    const product = { title, description, image, price };
    const result = await this.productRepository.save(product);
    return { id: result.id };
  }

  async getAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products;
  }

  async getById(id: number): Promise<Product> {
    const product = await this.findProduct(id);
    return product;
  }

  async update(
    id: number,
    title: string,
    description: string,
    image: string,
    price: number,
  ): Promise<{ id: number }> {
    const product = await this.findProduct(id);

    const updatedProduct = { ...product };

    if (title) {
      updatedProduct.title = title;
    }

    if (description) {
      updatedProduct.description = description;
    }

    if (image) {
      updatedProduct.image = image;
    }

    if (price) {
      updatedProduct.price = price;
    }

    const result = await this.productRepository.save(updatedProduct);
    return { id: result.id };
  }

  async delete(id: number): Promise<string> {
    const product = await this.findProduct(id);

    const result = await this.productRepository.delete(id);
    return result.raw;
  }

  private async findProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
