import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'This is a custom message' })
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNumber({ maxDecimalPlaces: 4 })
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @Min(0)
  @IsNotEmpty()
  readonly stock: number;
}
