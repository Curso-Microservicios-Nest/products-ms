import { Body, Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create' })
  create(@Payload() createProduct: CreateProductDto) {
    return this.productsService.create(createProduct);
  }

  @MessagePattern({ cmd: 'find_all' })
  findAll(@Payload() pagination: PaginationDto) {
    return this.productsService.findAll(pagination);
  }

  @MessagePattern({ cmd: 'find_one' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update' })
  update(@Body() updateProduct: UpdateProductDto) {
    const { id, ...data } = updateProduct;
    return this.productsService.update(id, data);
  }

  @MessagePattern({ cmd: 'remove' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @MessagePattern({ cmd: 'soft_remove' })
  softRemove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.softRemove(id);
  }
}
