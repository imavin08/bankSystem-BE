import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { TransactionResponse } from './transaction.response';

export class PaginationResponse {
	@ApiProperty({ type: TransactionResponse, isArray: true })
	@Expose()
	@Type(() => TransactionResponse)
	transactions: TransactionResponse[];

	@ApiProperty({ example: 10 })
	@Expose()
	@IsNumber()
	total: number;
}
