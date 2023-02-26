import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankRequest } from 'src/dto';
import { UpdateBankRequest } from 'src/dto/bank/requests/update-bank.request';
import { Bank } from 'src/modules/bank/entities/bank.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankRepository {
	constructor(
		@InjectRepository(Bank)
		private bankRepository: Repository<Bank>
	) {}

	async findAll(): Promise<Bank[]> {
		return this.bankRepository.find();
	}

	async findById(id: number): Promise<Bank> {
		return this.bankRepository.findOne({ where: { id } });
	}

	async create(request: BankRequest): Promise<Bank> {
		return this.bankRepository.save(request);
	}

	async update(id: number, data: UpdateBankRequest): Promise<void> {
		await this.bankRepository.update(id, data);
	}

	async delete(id: number): Promise<void> {
		await this.bankRepository.delete(id);
	}
}
