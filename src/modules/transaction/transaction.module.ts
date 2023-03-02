import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankModule } from '../bank/bank.module';
import { BankService } from '../bank/bank.service';
import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/category.service';
import { Transaction } from './entities/transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
	imports: [TypeOrmModule.forFeature([Transaction]), BankModule, CategoryModule],
	controllers: [TransactionController],
	providers: [TransactionService, BankService, CategoryService],
	exports: [TypeOrmModule],
})
export class TransactionModule {}
