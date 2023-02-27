import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionRequest, TransactionResponse } from 'src/common/dto/transaction';
import { TransactionService } from './transaction.service';

@Controller('transaction')
@ApiTags('transaction')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Get()
	@ApiOperation({
		summary: '[FindAllTransaction]',
		description: 'find all transaction',
	})
	@ApiResponse({ type: [TransactionResponse] })
	async findAllBanks(): Promise<TransactionResponse[]> {
		return this.transactionService.findAllTransactions();
	}

	@Get(':id')
	@ApiOperation({
		summary: '[FindTransaction]',
		description: 'find transaction',
	})
	@ApiResponse({ type: TransactionResponse })
	async findTransactionById(@Param('id') id: number): Promise<TransactionResponse> {
		return this.transactionService.findTransactionById(id);
	}

	@Post()
	@ApiOperation({
		summary: '[CreateTransaction]',
		description: 'create transaction',
	})
	@ApiResponse({ type: TransactionResponse })
	async createTransaction(
		@Body() request: TransactionRequest
	): Promise<TransactionResponse> {
		return this.transactionService.createTransaction(request);
	}

	@Delete(':id')
	@ApiOperation({
		summary: '[Delete Transaction]',
		description: 'delete transaction',
	})
	@ApiResponse({ type: TransactionResponse })
	async deleteTransaction(@Param('id') id: number): Promise<void> {
		await this.transactionService.deleteTransaction(id);
	}
}
