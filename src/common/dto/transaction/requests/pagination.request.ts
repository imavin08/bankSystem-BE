import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationRequest {
	@ApiProperty({ example: 1 })
	@Expose()
	@IsNumber()
	page: number;

	@ApiProperty({ example: 5 })
	@Expose()
	@IsNumber()
	limit: number;
}
