import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class BankDto {
	@ApiProperty({ example: 'PrivatBank' })
	@Expose()
	@IsString()
	name: string;

	@ApiProperty({ example: 1 })
	@Expose()
	@IsNumber()
	balance: number;
}
