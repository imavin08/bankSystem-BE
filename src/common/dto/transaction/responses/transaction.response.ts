import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsEnum, IsNumber } from 'class-validator';
import { TransactionTypeEnum } from 'src/common/enums/transaction-type.enum';
import { TransactionDto } from '../transaction.dto';

export class TransactionResponse extends TransactionDto {
	@ApiProperty({ example: 3 })
	@Expose()
	@IsNumber()
	id: number;

	@ApiProperty({ enum: TransactionTypeEnum, example: TransactionTypeEnum.Consumable })
	@Expose()
	@IsEnum(TransactionTypeEnum)
	type: TransactionTypeEnum;

	@ApiProperty({ example: 'date' })
	@Expose()
	@IsDate()
	createdAt: Date;

	@ApiProperty({ example: 'id' })
	@Expose()
	category: any;
}
