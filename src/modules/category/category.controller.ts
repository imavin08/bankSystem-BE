import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryRequest, CategoryResponse, UpdateCategory } from 'src/common/dto';
import { CategoryService } from './category.service';

@Controller('category')
@ApiTags('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	@ApiOperation({
		summary: '[FindAllCategories]',
		description: 'find all categories',
	})
	@ApiResponse({ type: [CategoryResponse] })
	async findAllCategories(): Promise<CategoryResponse[]> {
		return this.categoryService.findAllCategories();
	}

	@Get(':id')
	@ApiOperation({
		summary: '[FindCategory]',
		description: 'find category',
	})
	@ApiResponse({ type: CategoryResponse })
	async findCategoryById(@Param('id') id: number): Promise<CategoryResponse> {
		return this.categoryService.findCategoryById(id);
	}

	@Post()
	@ApiOperation({
		summary: '[CreateCategory]',
		description: 'create category',
	})
	@ApiResponse({ type: CategoryResponse })
	async createCategory(@Body() request: CategoryRequest): Promise<CategoryResponse> {
		return this.categoryService.createCategory(request);
	}

	@Patch(':id')
	@ApiOperation({
		summary: '[UpdateCategory]',
		description: 'update category',
	})
	@ApiResponse({ type: CategoryResponse })
	async updateCategory(@Body() data: UpdateCategory, @Param('id') id: number) {
		return this.categoryService.updateCategory(id, data);
	}

	@Delete(':id')
	@ApiOperation({
		summary: '[DeleteCategory]',
		description: 'delete category',
	})
	@ApiResponse({ type: CategoryResponse })
	async deleteCategory(@Param('id') id: number): Promise<void> {
		await this.categoryService.deleteCategory(id);
	}
}
