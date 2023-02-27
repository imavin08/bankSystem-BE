import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateCategory {
	@ApiPropertyOptional()
	@IsOptional()
	name?: string;
}
