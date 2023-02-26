import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRequest, CategoryResponse, UpdateCategory } from 'src/dto';
import { CategoryRepository } from 'src/repository';

@Injectable()
export class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async findAllCategories(): Promise<CategoryResponse[]> {
		return this.categoryRepository.findAll();
	}

	async findCategoryById(id: number): Promise<CategoryResponse> {
		const category = await this.categoryRepository.findById(id);
		if (!category) {
			throw new NotFoundException(`Category with id ${id} was not found`);
		}
		return category;
	}

	async createCategory(request: CategoryRequest): Promise<CategoryResponse> {
		return this.categoryRepository.create(request);
	}

	async updateCategory(id: number, data: UpdateCategory): Promise<CategoryResponse> {
		const category = await this.findCategoryById(id);
		await this.categoryRepository.update(id, data);

		return { ...category, ...data };
	}

	async deleteCategory(id: number): Promise<void> {
		await this.findCategoryById(id);
		await this.categoryRepository.delete(id);
	}
}
