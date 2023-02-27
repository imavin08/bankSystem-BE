import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRequest, TransactionResponse } from 'src/common/dto/transaction';
import { TransactionRepository } from 'src/repository';
import { BankService } from '../bank/bank.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class TransactionService {
	constructor(
		private readonly transactionRepository: TransactionRepository,
		private readonly bankService: BankService,
		private readonly categoryService: CategoryService
	) {}

	async findAllTransactions(): Promise<TransactionResponse[]> {
		return this.transactionRepository.findAll();
	}

	async findTransactionById(id: number): Promise<TransactionResponse> {
		const transaction = await this.transactionRepository.findById(id);
		if (!transaction) {
			throw new NotFoundException(`Category with id ${id} was not found`);
		}
		return transaction;
	}

	async createTransaction(request: TransactionRequest): Promise<TransactionResponse> {
		return this.transactionRepository.create(request);
	}

	async deleteTransaction(id: number): Promise<void> {
		await this.findTransactionById(id);
		await this.transactionRepository.delete(id);
	}
}
