import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';

const providers = [BankService];
@Module({
	imports: [RepositoryModule],
	controllers: [BankController],
	providers,
	exports: [...providers],
})
export class BankModule {}
