import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CategoryDto {
	@ApiProperty({ example: 1 })
	@Expose()
	@IsNumber()
	amount: number;

	@ApiProperty()
	@Expose()
	@IsString()
	type: string;
}
