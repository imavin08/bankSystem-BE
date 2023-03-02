import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Bank {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	balance: number;

	@OneToMany(() => Transaction, transaction => transaction.bank, {
		onDelete: 'RESTRICT',
	})
	transaction: Transaction[];
}
