import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankRequest } from 'src/dto/bank/requests/bank.request';
import { Bank } from 'src/modules/bank/entities/bank.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankRepository {
	constructor(
		@InjectRepository(Bank)
		private bankRepository: Repository<Bank>
	) {}

	async create(request: BankRequest): Promise<Bank> {
		return this.bankRepository.save(request);
	}
}
