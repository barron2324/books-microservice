import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule } from "@nestjs/throttler";
import configuration from "src/config/configuration";
import { mongooseModuleAsyncOptions } from "src/mongoose.providers";
import { throttlerAsyncOptions, throttlerServiceProvider } from "src/throttler.providers";
import { CategoryModule } from "../category/category.module";
import { BooksModule } from "../books/books.module";
import { BooksStockModule } from "../books-stock/books-stock.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true
        }),
        MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
        ThrottlerModule.forRootAsync(throttlerAsyncOptions),
        CategoryModule,
        BooksModule,
        BooksStockModule,
    ],
    providers: [throttlerServiceProvider]
})

export class AppModule {}