import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';
import { TransactionDto } from '../transaction.dto';

export class TransactionResponse extends TransactionDto {
	@ApiProperty({ example: 3 })
	@Expose()
	@IsNumber()
	id: number;

	@ApiProperty({ example: 'date' })
	@Expose()
	@IsDate()
	createdAt: Date;
}
