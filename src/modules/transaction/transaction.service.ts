import { HttpService } from '@nestjs/axios';
import {
	BadRequestException,
	HttpException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRequest } from 'src/common/dto/transaction';
import { PaginationRequest } from 'src/common/dto/transaction/requests/pagination.request';
import { StatisticsRequest } from 'src/common/dto/transaction/requests/statistics.request';
import { PaginationResponse } from 'src/common/dto/transaction/responses/pagination.response';
import { TransactionTypeEnum } from 'src/common/enums/transaction-type.enum';
import { DataSource, Repository } from 'typeorm';
import { BankService } from '../bank/bank.service';
import { CategoryService } from '../category/category.service';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
	constructor(
		@InjectRepository(Transaction)
		private transactionRepository: Repository<Transaction>,
		private dataSource: DataSource,
		private readonly bankService: BankService,
		private readonly categoryService: CategoryService,
		private readonly httpService: HttpService
	) {}

	async createTransaction(
		request: TransactionRequest,
		categoryIds: number[],
		type: TransactionTypeEnum
	): Promise<Transaction> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.startTransaction();
		let newTransaction;
		try {
			const currentBank = await this.bankService.findBankById(request.bank);
			const categories = await this.categoryService.findManyCategories(categoryIds);

			const transaction = new Transaction();
			transaction.amount = request.amount;
			type === TransactionTypeEnum.Consumable
				? (currentBank.balance -= request.amount)
				: (currentBank.balance += request.amount);
			transaction.type = type;
			transaction.bank = currentBank;
			transaction.category = [...categories];
			newTransaction = await queryRunner.manager.save(transaction);
			await queryRunner.manager.save(currentBank);

			// this.httpService
			// 	.post(process.env.WEBHOOK_MAIL, {
			// 		newTransaction,
			// 	})
			// 	.subscribe({
			// 		complete: () => {
			// 			console.log('Web-hook completed');
			// 		},
			// 		error: err => {
			// 			throw new HttpException(err, 400, {
			// 				cause: new Error(err.message),
			// 			});
			// 		},
			// 	});

			await queryRunner.commitTransaction();
		} catch (err) {
			await queryRunner.rollbackTransaction();
			throw new BadRequestException(err.message);
		} finally {
			await queryRunner.release();
		}
		return newTransaction;
	}

	async findAllTransactions(
		pagination: PaginationRequest
	): Promise<PaginationResponse> {
		const total = await this.transactionRepository.count({});

		const transactions = await this.dataSource
			.getRepository(Transaction)
			.createQueryBuilder('transaction')
			.leftJoinAndSelect('transaction.category', 'category')
			.leftJoinAndSelect('transaction.bank', 'bank')
			.skip(pagination.page > 0 ? (pagination.page - 1) * pagination.limit : 0)
			.take(pagination.limit)
			.getMany();

		return { transactions, total };
	}

	async findTransactionById(id: number): Promise<Transaction> {
		const transaction = await this.transactionRepository.findOne({ where: { id } });
		if (!transaction) {
			throw new NotFoundException(`Transaction with id ${id} was not found`);
		}
		return transaction;
	}

	async deleteTransaction(id: number): Promise<Transaction> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		let transaction;
		try {
			transaction = await this.findTransactionById(id);
			const bank = await this.bankService.findBankById(transaction.bank.id);
			transaction.type === TransactionTypeEnum.Consumable
				? (bank.balance += transaction.amount)
				: (bank.balance -= transaction.amount);
			await queryRunner.manager.save(bank);

			await this.transactionRepository.delete(id);

			await queryRunner.commitTransaction();
		} catch (err) {
			await queryRunner.rollbackTransaction();
			throw new BadRequestException(err.message);
		} finally {
			await queryRunner.release();
		}
		return transaction;
	}

	formattingStatistics = transactions => {
		const expenses = {};
		for (const trans of transactions) {
			let type;
			let name;
			name = trans.category.map(category => category.name);
			name.length > 1 ? (name = name.join(',')) : (name = name.join(''));
			trans.type === TransactionTypeEnum.Consumable ? (type = '-') : (type = '+');
			const amount = trans.amount;
			expenses[name] = `${type}${amount}`;
		}
		return expenses;
	};

	async getTransactionStatistics(
		categoryIds: number[],
		date: StatisticsRequest
	): Promise<any> {
		const startDate = new Date(`${date.fromPeriod}`);
		const endDate = new Date(`${date.toPeriod}`);

		const transactions = await this.dataSource
			.getRepository(Transaction)
			.createQueryBuilder('transaction')
			.leftJoinAndSelect('transaction.category', 'category')
			.where('transaction.createdAt BETWEEN :startDate AND :endDate', {
				startDate,
				endDate,
			})
			.andWhere('category.id IN (:...categoryIds)', { categoryIds })
			.getMany();

		if (!transactions.length) {
			throw new BadRequestException(
				'Transactions for this category or for this period was not found'
			);
		}

		return this.formattingStatistics(transactions);
	}
}
