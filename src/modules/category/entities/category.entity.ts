import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => Transaction, transaction => transaction.category)
	transaction: Transaction;
}
