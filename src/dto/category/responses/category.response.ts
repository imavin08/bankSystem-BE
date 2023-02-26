import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { CategoryDto } from '../category.dto';

export class CategoryResponse extends CategoryDto {
	@ApiProperty({ example: 1 })
	@Expose()
	@IsNumber()
	id: number;
}
