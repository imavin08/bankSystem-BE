import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRequest } from 'src/common/dto/transaction';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionRepository {
	constructor(
		@InjectRepository(Transaction)
		private transactionRepository: Repository<Transaction>
	) {}

	async findAll(): Promise<Transaction[]> {
		return this.transactionRepository.find();
	}

	async findById(id: number): Promise<Transaction> {
		return this.transactionRepository.findOne({ where: { id } });
	}

	async create(request: TransactionRequest): Promise<Transaction> {
		return this.transactionRepository.save(request);
	}

	async delete(id: number): Promise<void> {
		await this.transactionRepository.delete(id);
	}
}
