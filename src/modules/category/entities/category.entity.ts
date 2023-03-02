import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToMany(() => Transaction, transaction => transaction.category, {
		onDelete: 'RESTRICT',
	})
	transaction: Transaction;
}
