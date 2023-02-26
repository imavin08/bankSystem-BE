import { BankRequest } from 'src/dto/bank/requests/bank.request';
import { BankRepository } from 'src/repository';
import { Bank } from './entities/bank.entity';
export declare class BankService {
    private readonly bankRepository;
    constructor(bankRepository: BankRepository);
    createBank(request: BankRequest): Promise<Bank>;
}
