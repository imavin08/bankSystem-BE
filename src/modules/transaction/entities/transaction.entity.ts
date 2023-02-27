import { IsEnum } from 'class-validator';
import { TransactionTypeEnum } from 'src/common/enums/transaction-type.enum';
import { Bank } from 'src/modules/bank/entities/bank.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	amount: number;

	@Column()
	@IsEnum(TransactionTypeEnum)
	type: TransactionTypeEnum;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(() => Bank, bank => bank.transaction)
	bank: Bank;

	@OneToMany(() => Category, category => category.transaction)
	category: Category[];
}
