import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class StatisticsResponse {
	@ApiProperty({})
	@Expose()
	expenses: object;
}
