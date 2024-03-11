import { Controller, InternalServerErrorException, Logger } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CATEGORY_CMD } from "src/constants";
import { payloadCategory } from "./interfaces/payload-category.interface";
import { Category } from "./category.schema";

@Controller('category')
export class CategoryMicroservice {
    private readonly logger = new Logger(CategoryMicroservice.name)

    constructor(
        private readonly categoryService: CategoryService,
    ) { }

    @MessagePattern({
        cmd: CATEGORY_CMD,
        method: 'get-all-category'
    })
    async getAllCategories(): Promise<Category> {
        try {
            return await this.categoryService.getCategoryModel().find({}, { _id: 0 }).lean()
        } catch (e) {
            this.logger.error(`catch on get-all-category: ${e?.message ?? JSON.stringify(e)}`);
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            });
        }
    }

    @MessagePattern({
        cmd: CATEGORY_CMD,
        method: 'create-category-book'
    })
    async createCategoryBook(
        @Payload() payload: payloadCategory,
    ): Promise<void> {
        try {
            await this.categoryService.create(payload);
        } catch (e) {
            this.logger.error(`catch on create-category-book: ${e?.message ?? JSON.stringify(e)}`);
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            });
        }
    }

    @MessagePattern({
        cmd: CATEGORY_CMD,
        method: 'update-category-book'
    })
    async updateCategoryBook(@Payload() update: { categoryId: string, categoryName: string } ): Promise<void> {
        try {
            await this.categoryService.getCategoryModel().updateOne(
                { categoryId: update.categoryId },
                { categoryName: update.categoryName }
                );
        } catch (e) {
            this.logger.error(`catch on create-category-book: ${e?.message ?? JSON.stringify(e)}`);
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            });
        }
    }

    @MessagePattern({
        cmd: CATEGORY_CMD,
        method: 'get-category-book'
    })
    async getCategoryBook(@Payload() categoryId: string): Promise<Category> {
        try {
            return this.categoryService.getCategoryById(categoryId)
        } catch (error) {
            this.logger.error(
                `catch on get-category-book: ${error?.message ?? JSON.stringify(error)}`,
            )
            throw new InternalServerErrorException({
                message: error?.message ?? error,
            })
        }
    }

    @MessagePattern({
        cmd: CATEGORY_CMD,
        method: 'get-category-by-categoryName'
    })
    async getCategoryByCategoryName(@Payload() categoryName: string): Promise<Category> {
        try {
            return this.categoryService.getCategoryByName(categoryName)
        } catch (error) {
            this.logger.error(
                `Error getting category by categoryName: ${error?.message ?? JSON.stringify(error)}`,
            )
            throw new InternalServerErrorException({
                message: error?.message ?? error,
            })
        }
    }
}