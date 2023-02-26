import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCategory } from 'src/dto';
import { Category } from 'src/modules/category/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>
	) {}

	async findAll(): Promise<Category[]> {
		return this.categoryRepository.find();
	}

	async findById(id: number): Promise<Category> {
		return this.categoryRepository.findOne({ where: { id } });
	}

	async create(request: UpdateCategory): Promise<Category> {
		return this.categoryRepository.save(request);
	}

	async update(id: number, data: Partial<Category>): Promise<void> {
		await this.categoryRepository.update(id, data);
	}

	async delete(id: number): Promise<void> {
		await this.categoryRepository.delete(id);
	}
}
