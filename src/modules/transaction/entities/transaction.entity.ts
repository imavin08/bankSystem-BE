import { IsEnum } from 'class-validator';
import { TransactionTypeEnum } from 'src/common/enums/transaction-type.enum';
import { Bank } from 'src/modules/bank/entities/bank.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
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

	@ManyToOne(() => Bank, bank => bank.transaction, { eager: true })
	bank: Bank;

	@ManyToMany(() => Category, categoty => categoty.transaction, {
		cascade: true,
		eager: true,
	})
	@JoinTable()
	category: Category[];
}
