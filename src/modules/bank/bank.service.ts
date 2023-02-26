import { Injectable, NotFoundException } from '@nestjs/common';
import { BankRequest, BankResponse } from 'src/dto';
import { UpdateBankRequest } from 'src/dto/bank/requests/update-bank.request';
import { BankRepository } from 'src/repository';
import { DeleteResult } from 'typeorm';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BankService {
	constructor(private readonly bankRepository: BankRepository) {}

	async findAllBanks(): Promise<BankResponse[]> {
		return this.bankRepository.findAll();
	}

	async findBankById(id: number): Promise<BankResponse> {
		const bank = await this.bankRepository.findById(id);
		if (!bank) {
			throw new NotFoundException(`Bank with id ${id} was not found`);
		}
		return bank;
	}

	async createBank(request: BankRequest): Promise<BankResponse> {
		return this.bankRepository.create(request);
	}

	async updateBank(id: number, data: UpdateBankRequest): Promise<BankResponse> {
		const bank = await this.findBankById(id);
		await this.bankRepository.update(id, data);

		return { ...bank, ...data };
	}

	async deleteBank(id: number): Promise<void> {
		await this.findBankById(id);
		await this.bankRepository.delete(id);
	}
}
