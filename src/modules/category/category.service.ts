import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/repository';

@Injectable()
export class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}
}
