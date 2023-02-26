import { BankRequest, BankResponse } from 'src/dto';
import { UpdateBankRequest } from 'src/dto/bank/requests/update-bank.request';
import { BankRepository } from 'src/repository';
export declare class BankService {
    private readonly bankRepository;
    constructor(bankRepository: BankRepository);
    findAllBanks(): Promise<BankResponse[]>;
    findBankById(id: number): Promise<BankResponse>;
    createBank(request: BankRequest): Promise<BankResponse>;
    updateBank(id: number, data: UpdateBankRequest): Promise<BankResponse>;
    deleteBank(id: number): Promise<void>;
}
