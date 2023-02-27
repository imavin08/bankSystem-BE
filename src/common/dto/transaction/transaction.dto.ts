import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import { TransactionTypeEnum } from 'src/common/enums/transaction-type.enum';

export class TransactionDto {
	@ApiProperty({ example: 100 })
	@Expose()
	@IsNumber()
	amount: number;

	@ApiProperty({ example: TransactionTypeEnum.Consumable, enum: TransactionTypeEnum })
	@Expose()
	@IsEnum(TransactionTypeEnum)
	type: TransactionTypeEnum;

	@ApiProperty({ example: 'id' })
	@Expose()
	bank: any;

	@ApiProperty({ example: 'id' })
	@Expose()
	category: any;
}
