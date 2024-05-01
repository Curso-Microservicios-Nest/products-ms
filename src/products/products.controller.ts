import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({ description: 'Product created successfully' })
  create(@Body() createProduct: CreateProductDto) {
    return this.productsService.create(createProduct);
  }

  @Get()
  @ApiOperation({ summary: 'List all products' })
  findAll(@Query() pagination: PaginationDto) {
    return this.productsService.findAll(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Delete('soft-delete/:id')
  @ApiOperation({ summary: 'Soft delete a product by ID' })
  softRemove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.softRemove(id);
  }
}
