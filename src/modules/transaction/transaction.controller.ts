import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseArrayPipe,
	Post,
	Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionRequest, TransactionResponse } from 'src/common/dto/transaction';
import { PaginationRequest } from 'src/common/dto/transaction/requests/pagination.request';
import { StatisticsRequest } from 'src/common/dto/transaction/requests/statistics.request';
import { PaginationResponse } from 'src/common/dto/transaction/responses/pagination.response';
import { StatisticsResponse } from 'src/common/dto/transaction/responses/statistics.responce';
import { TransactionTypeEnum } from 'src/common/enums/transaction-type.enum';
import { TransactionService } from './transaction.service';

@Controller('transaction')
@ApiTags('transaction')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Post()
	@ApiOperation({
		summary: '[CreateTransaction]',
		description: 'create transaction',
	})
	@ApiResponse({ type: TransactionResponse })
	@ApiQuery({ name: 'type', enum: TransactionTypeEnum })
	async createTransaction(
		@Query('categoryIds', new ParseArrayPipe({ items: Number, separator: ',' }))
		categoryIds: number[],
		@Query('type') type: TransactionTypeEnum,
		@Body() request: TransactionRequest
	): Promise<TransactionResponse> {
		return this.transactionService.createTransaction(request, categoryIds, type);
	}

	@Get()
	@ApiOperation({
		summary: '[FindAllTransaction]',
		description: 'find all transaction',
	})
	@ApiResponse({ type: PaginationResponse })
	async findAllTransactions(
		@Query() pagination: PaginationRequest
	): Promise<PaginationResponse> {
		return this.transactionService.findAllTransactions(pagination);
	}

	@Get('statistics/:categoryId')
	@ApiOperation({
		summary: '[Get Transaction Statistics]',
		description: 'Get transaction statistics',
	})
	async GetTransactionStatistics(
		@Query('categoryIds', new ParseArrayPipe({ items: Number, separator: ',' }))
		categoryIds: number[],
		@Query() date: StatisticsRequest
	): Promise<StatisticsResponse> {
		return await this.transactionService.getTransactionStatistics(categoryIds, date);
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

	@Delete(':id')
	@ApiOperation({
		summary: '[Delete Transaction]',
		description: 'delete transaction',
	})
	@ApiResponse({ type: TransactionResponse })
	async deleteTransaction(@Param('id') id: number): Promise<TransactionResponse> {
		return this.transactionService.deleteTransaction(id);
	}
}
