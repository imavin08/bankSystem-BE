import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from 'src/modules/bank/entities/bank.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { BankRepository, CategoryRepository } from './repositories';

const providers = [BankRepository, CategoryRepository];
const entities = [Bank, Category];

@Module({
	imports: [TypeOrmModule.forFeature([...entities])],
	controllers: [],
	providers,
	exports: [...providers, TypeOrmModule.forFeature([...entities])],
})
export class RepositoryModule {}
