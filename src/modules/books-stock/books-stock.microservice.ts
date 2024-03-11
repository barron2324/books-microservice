import { Controller, InternalServerErrorException, Logger } from "@nestjs/common";
import { BooksStockService } from "./books-stock.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { BOOKSSTOCK_CMD } from "src/constants";
import { BooksStock } from "./books-stock.schema";
import { addBookStock } from "./interfaces/add-book-stock.interface";

@Controller('books-stock')
export class BooksStockMicroservice {
    private readonly logger = new Logger(BooksStockMicroservice.name)

    constructor(
        private readonly booksStockService: BooksStockService
    ) { }

    @MessagePattern({
        cmd: BOOKSSTOCK_CMD,
        method: 'get-book-stock-by-id'
    })
    async getBookStockById(@Payload() bookId: string): Promise<BooksStock> {
        try {
            return this.booksStockService.getBookById(bookId)
        } catch (e) {
            this.logger.error(
                `catch on get-book-stock-by-id: ${e?.message ?? JSON.stringify(e)}`,
            )
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            })
        }
    }

    @MessagePattern({
        cmd: BOOKSSTOCK_CMD,
        method: 'get-all-books-in-stock'
    })
    async getAllBooksInStock(): Promise<BooksStock> {
        try {
            return this.booksStockService.getAllBookInStock()
        } catch (e) {
            this.logger.error(
                `catch on get-all-books-in-stock: ${e?.message ?? JSON.stringify(e)}`,
            )
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            })
        }
    }

    @MessagePattern({
        cmd: BOOKSSTOCK_CMD,
        method: 'create-book-to-stock'
    })
    async createBookToStock(@Payload() payload: addBookStock): Promise<void> {
        const { quantity } = payload
        try {
            await this.booksStockService.getBooksStockModel().create({
                ...payload,
                totalQuantity: quantity
            })
        } catch (e) {
            this.logger.error(
                `catch on create-book-to-stock: ${e?.message ?? JSON.stringify(e)}`,
            )
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            })
        }
    }

    @MessagePattern({
        cmd: BOOKSSTOCK_CMD,
        method: 'add-book-in-stock'
    })
    async addBookInStock(@Payload() payload: { addStock: BooksStock, quantity: number }): Promise<void> {
        const { addStock, quantity } = payload
        try {
            await this.booksStockService.getBooksStockModel().updateOne({
                bookId: addStock.bookId
            },
                {
                    quantity: addStock.quantity + quantity,
                    totalQuantity: addStock.totalQuantity + quantity,
                    quantityUpdateAt: new Date
                }
            )
        } catch (e) {
            this.logger.error(
                `catch on add-book-in-stock: ${e?.message ?? JSON.stringify(e)}`,
            )
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            })
        }
    }
}