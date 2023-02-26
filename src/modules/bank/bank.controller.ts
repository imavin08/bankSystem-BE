import { Body, Controller, Post } from '@nestjs/common';

import { BankRequest } from 'src/dto/bank/requests/bank.request';
import { BankResponse } from 'src/dto/bank/responses/bank.response';
import { BankService } from './bank.service';

@Controller('bank')
export class BankController {
	constructor(private readonly bankService: BankService) {}

	@Post()
	async createBank(@Body() request: BankRequest): Promise<BankResponse> {
		return this.bankService.createBank(request);
	}
}
