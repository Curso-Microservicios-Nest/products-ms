import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'Shoes' })
  @IsString({ message: 'This is a custom message' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'This is a pair of shoes',
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ description: 'The price of the product', example: 100_000 })
  @IsNumber({ maxDecimalPlaces: 4 })
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({ description: 'The stock of the product', example: 100 })
  @Min(0)
  @IsNotEmpty()
  readonly stock: number;
}
