import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate } from 'class-validator';

export class StatisticsRequest {
	@ApiProperty({ example: '2023-03-01 00:00:01' })
	@Expose()
	@IsDate()
	fromPeriod: Date;

	@ApiProperty({ example: '2023-03-02 23:59:59' })
	@Expose()
	@IsDate()
	toPeriod: Date;
}
