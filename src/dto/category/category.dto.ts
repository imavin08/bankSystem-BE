import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CategoryDto {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	name: string;
}
