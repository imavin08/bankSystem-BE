import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from 'src/modules/bank/entities/bank.entity';
import { BankRepository } from './repositories';

const providers = [BankRepository];
const entities = [Bank];

@Module({
	imports: [TypeOrmModule.forFeature([...entities])],
	controllers: [],
	providers,
	exports: [...providers, TypeOrmModule.forFeature([...entities])],
})
export class RepositoryModule {}
