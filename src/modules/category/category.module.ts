import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

const providers = [CategoryService];

@Module({
	imports: [RepositoryModule],
	controllers: [CategoryController],
	providers,
	exports: [...providers],
})
export class CategoryModule {}
