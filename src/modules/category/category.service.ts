import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRequest, UpdateCategory } from 'src/common/dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>
	) {}

	async createCategory(request: CategoryRequest): Promise<Category> {
		return this.categoryRepository.save(request);
	}

	async findAllCategories(): Promise<Category[]> {
		return this.categoryRepository.find();
	}

	async findCategoryById(id: number): Promise<Category> {
		const category = await this.categoryRepository.findOne({ where: { id } });
		if (!category) {
			throw new NotFoundException(`Category with id ${id} was not found`);
		}
		return category;
	}

	async findManyCategories(categoryIds: number[]): Promise<Category[]> {
		const categories = await this.categoryRepository
			.createQueryBuilder('category')
			.where('category.id IN (:...categoryIds)', { categoryIds })
			.getMany();

		if (!categories.length) {
			throw new NotFoundException('Categories not found');
		}
		return categories;
	}
	async updateCategory(id: number, data: UpdateCategory): Promise<Category> {
		const category = await this.findCategoryById(id);
		await this.categoryRepository.update(id, data);
		return { ...category, ...data };
	}

	async deleteCategory(id: number): Promise<Category> {
		const category = await this.findCategoryById(id);
		try {
			await this.categoryRepository.delete(id);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
		return category;
	}
}
