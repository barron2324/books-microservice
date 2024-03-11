import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BooksStock } from "./books-stock.schema";
import { DB_CONNECTION_NAME } from "src/constants";
import { Model } from "mongoose";

@Injectable()
export class BooksStockService {
    private readonly logger = new Logger(BooksStockService.name)

    @InjectModel(BooksStock.name, DB_CONNECTION_NAME)
    private readonly booksStockModel: Model<BooksStock>

    getBooksStockModel(): Model<BooksStock> {
        return this.booksStockModel
    }

    getBookById(bookId: string): Promise<BooksStock> {
        return this.booksStockModel.findOne({ bookId }).lean()
    }

    getAllBookInStock(): Promise<BooksStock> {
        return this.booksStockModel.find({}, {
            _id: 0,
            createdAt: 0,
            updatedAt: 0
        }).lean()
    }
}