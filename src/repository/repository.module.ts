import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from 'src/modules/bank/entities/bank.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import {
	BankRepository,
	CategoryRepository,
	TransactionRepository,
} from './repositories';

const providers = [BankRepository, CategoryRepository, TransactionRepository];
const entities = [Bank, Category, Transaction];

@Module({
	imports: [TypeOrmModule.forFeature([...entities])],
	controllers: [],
	providers,
	exports: [...providers, TypeOrmModule.forFeature([...entities])],
})
export class RepositoryModule {}
