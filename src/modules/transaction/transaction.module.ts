import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository';
import { BankService } from '../bank/bank.service';
import { CategoryService } from '../category/category.service';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

const providers = [TransactionService, BankService, CategoryService];

@Module({
	imports: [RepositoryModule],
	controllers: [TransactionController],
	providers,
	exports: [...providers],
})
export class TransactionModule {}
