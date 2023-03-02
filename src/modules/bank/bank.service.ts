import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankRequest } from 'src/common/dto';
import { UpdateBankRequest } from 'src/common/dto/bank/requests/update-bank.request';
import { Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BankService {
	constructor(
		@InjectRepository(Bank)
		private bankRepository: Repository<Bank>
	) {}

	async createBank(request: BankRequest): Promise<Bank> {
		return this.bankRepository.save(request);
	}

	async findAllBanks(): Promise<Bank[]> {
		return this.bankRepository.find();
	}

	async findBankById(id: number): Promise<Bank> {
		const bank = await this.bankRepository.findOne({ where: { id } });
		if (!bank) {
			throw new NotFoundException(`Bank with id ${id} not found`);
		}
		return bank;
	}

	async updateBank(id: number, data: UpdateBankRequest): Promise<Bank> {
		const bank = await this.findBankById(id);
		await this.bankRepository.update(id, data);
		return { ...bank, ...data };
	}

	async deleteBank(id: number): Promise<void> {
		await this.findBankById(id);
		try {
			await this.bankRepository.delete(id);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}
}
