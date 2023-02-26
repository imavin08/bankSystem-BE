import { BankRequest, BankResponse } from 'src/dto';
import { UpdateBankRequest } from 'src/dto/bank/requests/update-bank.request';
import { BankService } from './bank.service';
export declare class BankController {
    private readonly bankService;
    constructor(bankService: BankService);
    findAllBanks(): Promise<BankResponse[]>;
    findBankById(id: number): Promise<BankResponse>;
    createBank(request: BankRequest): Promise<BankResponse>;
    updateBank(data: UpdateBankRequest, id: number): Promise<BankResponse>;
    deleteBank(id: number): Promise<void>;
}
