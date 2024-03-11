import { InjectModel } from "@nestjs/mongoose";
import { Books } from "./books.schema";
import { DB_CONNECTION_NAME } from "src/constants";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BooksService {
    @InjectModel(Books.name, DB_CONNECTION_NAME)
    private readonly booksModel: Model<Books>

    constructor(

    ) {}

    getBooksModel(): Model<Books> {
        return this.booksModel
    }

    getAllBooks(): Promise<Books> {
        return this.booksModel.find({}, {
            imageUrl: 0,
            createdAt: 0,
            updatedAt: 0,
        }).lean()
    }

    getBookName(bookName: string): Promise<Books> {
        return this.booksModel.findOne({ bookName }).lean()
    }

    getBookById(bookId: string): Promise<Books> {
        return this.booksModel.findOne({ bookId }).lean()
    }
}   