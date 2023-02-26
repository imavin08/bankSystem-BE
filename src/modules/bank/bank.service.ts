import { Injectable } from '@nestjs/common';
import { BankRequest } from 'src/dto/bank/requests/bank.request';
import { BankRepository } from 'src/repository';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BankService {
	constructor(private readonly bankRepository: BankRepository) {}

	async createBank(request: BankRequest): Promise<Bank> {
		return this.bankRepository.create(request);
	}
}
