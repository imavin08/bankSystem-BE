import { BankRequest } from 'src/dto/bank/requests/bank.request';
import { BankResponse } from 'src/dto/bank/responses/bank.response';
import { BankService } from './bank.service';
export declare class BankController {
    private readonly bankService;
    constructor(bankService: BankService);
    createBank(request: BankRequest): Promise<BankResponse>;
}
