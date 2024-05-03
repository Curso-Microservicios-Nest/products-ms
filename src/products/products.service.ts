import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('💎 Connected to the database');
  }

  create(createProduct: CreateProductDto) {
    return this.product.create({ data: createProduct });
  }

  async findAll(pagination: PaginationDto) {
    const { limit, page } = pagination;

    const totalRows = await this.product.count({ where: { available: true } });
    const totalPages = Math.ceil(totalRows / limit);

    const data = await this.product.findMany({
      where: { available: true },
      take: limit,
      skip: (page - 1) * limit,
    });
    return {
      meta: { page, totalRows, totalPages },
      data,
    };
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: { id, available: true },
    });
    if (!product) {
      throw new RpcException(`Product #${id} not found`);
    }
    return product;
  }

  async update(id: number, data: Omit<UpdateProductDto, 'id'>) {
    await this.findOne(id);
    return this.product.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.product.delete({ where: { id } });
  }

  async softRemove(id: number) {
    await this.findOne(id);
    return this.product.update({
      where: { id },
      data: { available: false, deletedAt: new Date() },
    });
  }
}
