import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BankDto } from '../bank.dto';

export class UpdateBankRequest {
	@ApiPropertyOptional()
	@IsOptional()
	@Expose()
	@IsString()
	name?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@Expose()
	@IsNumber()
	balance?: number;
}
