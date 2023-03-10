import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BankRequest, BankResponse } from 'src/common/dto';
import { UpdateBankRequest } from 'src/common/dto/bank/requests/update-bank.request';
import { BankService } from './bank.service';

@Controller('bank')
@ApiTags('bank')
export class BankController {
	constructor(private readonly bankService: BankService) {}

	@Post()
	@ApiOperation({
		summary: '[CreateBank]',
		description: 'create bank',
	})
	@ApiResponse({ type: BankResponse })
	async createBank(@Body() request: BankRequest): Promise<BankResponse> {
		return this.bankService.createBank(request);
	}

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
	async deleteBank(@Param('id') id: number): Promise<BankResponse> {
		return this.bankService.deleteBank(id);
	}
}
