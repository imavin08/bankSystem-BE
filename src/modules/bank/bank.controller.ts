import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BankRequest, BankResponse } from 'src/dto';
import { UpdateBankRequest } from 'src/dto/bank/requests/update-bank.request';
import { DeleteResult } from 'typeorm';
import { BankService } from './bank.service';
import { Bank } from './entities/bank.entity';

@Controller('bank')
@ApiTags('bank')
export class BankController {
	constructor(private readonly bankService: BankService) {}

	@Get()
	@ApiOperation({
		summary: '[FindAllBanks]',
		description: 'find all banks',
	})
	@ApiResponse({ type: [BankResponse] })
	async findAllBanks(): Promise<BankResponse[]> {
		return this.bankService.findAllBanks();
	}

	@Get(':id')
	@ApiOperation({
		summary: '[FindBank]',
		description: 'find bank',
	})
	@ApiResponse({ type: BankResponse })
	async findBankById(@Param('id') id: number): Promise<BankResponse> {
		return this.bankService.findBankById(id);
	}

	@Post()
	@ApiOperation({
		summary: '[CreateBank]',
		description: 'create bank',
	})
	@ApiResponse({ type: BankResponse })
	async createBank(@Body() request: BankRequest): Promise<BankResponse> {
		return this.bankService.createBank(request);
	}

	@Patch(':id')
	@ApiOperation({
		summary: '[UpdateBank]',
		description: 'update bank',
	})
	@ApiResponse({ type: BankResponse })
	async updateBank(@Body() data: UpdateBankRequest, @Param('id') id: number) {
		return this.bankService.updateBank(id, data);
	}

	@Delete(':id')
	@ApiOperation({
		summary: '[DeleteBank]',
		description: 'delete bank',
	})
	@ApiResponse({ type: BankResponse })
	async deleteBank(@Param('id') id: number): Promise<void> {
		await this.bankService.deleteBank(id);
	}
}
