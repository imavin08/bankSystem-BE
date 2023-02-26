import { BankRequest } from 'src/dto/bank/requests/bank.request';
import { Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';
export declare class BankService {
    private bankRepository;
    constructor(bankRepository: Repository<Bank>);
    createBank(request: BankRequest): Promise<Bank>;
}
