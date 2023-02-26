import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { BankDto } from '../bank.dto';

export class BankResponse extends BankDto {
	@ApiProperty({ example: 1 })
	@Expose()
	@IsNumber()
	id: number;
}
