import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class TransactionDto {
	@ApiProperty({ example: 100 })
	@Expose()
	@IsNumber()
	amount: number;

	@ApiProperty({ example: 'id' })
	@Expose()
	bank: any;
}
