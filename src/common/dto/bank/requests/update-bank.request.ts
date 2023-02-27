import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
