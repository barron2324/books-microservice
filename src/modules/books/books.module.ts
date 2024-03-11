import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { model } from "src/config/model";
import { DB_CONNECTION_NAME } from "src/constants";
import { BooksService } from "./books.service";
import { BooksMicroserive } from "./books.microservice";

@Module({
    imports: [
        MongooseModule.forFeature(model, DB_CONNECTION_NAME)
    ],
    controllers: [BooksMicroserive],
    providers: [BooksService],
    exports: [BooksService]
})

export class BooksModule {}