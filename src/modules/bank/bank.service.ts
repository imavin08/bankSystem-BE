import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { BankDto } from 'src/dto/bank/bank.dto';
import { BankRequest } from 'src/dto/bank/requests/bank.request';
import { Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BankService {
	constructor(
		@InjectRepository(Bank)
		private bankRepository: Repository<Bank>
	) {}

	// getHello(): string {
	// 	return 'ITS WORK';
	// }

	async createBank(request: BankRequest): Promise<Bank> {
		return this.bankRepository.save(request);
	}
}
