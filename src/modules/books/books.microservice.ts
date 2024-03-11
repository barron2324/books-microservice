import { Controller, InternalServerErrorException, Logger } from "@nestjs/common";
import { BooksService } from "./books.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { BOOKS_CMD } from "src/constants";
import { BooksInterface } from "./interfaces/books.interface";
import { Books } from "./books.schema";

@Controller('books')
export class BooksMicroserive {
    private readonly logger = new Logger(BooksMicroserive.name)

    constructor(
        private readonly booksService: BooksService
    ) { }

    @MessagePattern({
        cmd: BOOKS_CMD,
        method: 'create-book'
    })
    async createBooks(
        @Payload() payload: BooksInterface,
    ): Promise<void> {
        this.logger.log(payload)
        try {
            await this.booksService.getBooksModel().create(payload)
        } catch (e) {
            this.logger.error(`catch on create-book: ${e?.message ?? JSON.stringify(e)}`)
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            })
        }
    }

    @MessagePattern({
        cmd: BOOKS_CMD,
        method: 'get-book-by-id'
    })
    async getBookById(@Payload() bookId: string): Promise<Books> {
        try {
            return await this.booksService.getBookById(bookId)
        } catch (e) {
            this.logger.error(`catch on get-book-by-id: ${e?.message ?? JSON.stringify(e)}`)
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            })
        }
    }

    @MessagePattern({
        cmd: BOOKS_CMD,
        method: 'get-by-bookName'
    })
    async getByBookName(@Payload() bookName: string): Promise<Books> {
        try {
            return await this.booksService.getBookName(bookName)
        } catch (e) {
            this.logger.error(`catch on get-by-bookName: ${e?.message ?? JSON.stringify(e)}`)
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            })
        }
    }

    @MessagePattern({
        cmd: BOOKS_CMD,
        method: 'get-all-books'
    })
    async getAllBooks(): Promise<Books> {
        try {
            return await this.booksService.getAllBooks()
        } catch (e) {
            this.logger.error(`catch on get-all-books: ${e?.message ?? JSON.stringify(e)}`)
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            })
        }
    }
}