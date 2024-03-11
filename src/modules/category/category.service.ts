import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./category.schema";
import { DB_CONNECTION_NAME } from "src/constants";
import { Model } from "mongoose";
import { payloadCategory } from "./interfaces/payload-category.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CategoryService {
    private readonly logger = new Logger(CategoryService.name)

    @InjectModel(Category.name, DB_CONNECTION_NAME)
    private readonly categoryModel: Model<Category>

    constructor(
        private readonly configService: ConfigService
    ) { }

    getCategoryModel(): Model<Category> {
        return this.categoryModel;
    }

    async create(payload: payloadCategory): Promise<Category> {
        const newCategory = new this.categoryModel({ ...payload });
        return await this.categoryModel.create(newCategory)
    }

    getCategoryById(categoryId: string): Promise<Category> {
        return this.categoryModel.findOne({ categoryId }).lean()
    }

    getCategoryByName(categoryName: string): Promise<Category> {
        return this.categoryModel.findOne({ categoryName }, {
            categoryId: 1,
            categoryName: 1
        }).lean();
    }
}