import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { model } from "src/config/model";
import { DB_CONNECTION_NAME } from "src/constants";
import { CategoryService } from "./category.service";
import { CategoryMicroservice } from "./category.microservice";

@Module({
    imports: [
        MongooseModule.forFeature(model, DB_CONNECTION_NAME)
    ],
    controllers: [CategoryMicroservice],
    providers: [CategoryService],
    exports: [CategoryService]
})
export class CategoryModule {}