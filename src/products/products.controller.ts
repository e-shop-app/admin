import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productsService.getAll();
  }

  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Product> {
    return await this.productsService.getById(id);
  }

  @Post()
  async addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('image') image: string,
    @Body('price') price: number,
  ): Promise<{ id: number }> {
    return await this.productsService.insert(title, description, image, price);
  }

  @Patch(':id')
  async editProduct(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('image') image: string,
    @Body('price') price: number,
  ): Promise<{ id: number }> {
    return await this.productsService.update(
      id,
      title,
      description,
      image,
      price,
    );
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<{ message: string }> {
    await this.productsService.delete(id);
    return { message: 'Product successfully deleted' };
  }
}
