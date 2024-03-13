import { BooksStock, BooksStockSchema } from "src/modules/books-stock/books-stock.schema";
import { Books, BooksSchema } from "src/modules/books/books.schema";
import { Category, CategorySchema } from "src/modules/category/category.schema";
import { Orders, OrdersSchema } from "src/modules/orders/orders.schema";

export const model = [
    {
        name: Books.name,
        schema: BooksSchema
    },
    {
        name: Category.name,
        schema: CategorySchema
    },
    {
        name: BooksStock.name,
        schema: BooksStockSchema
    },
    {
        name: Orders.name,
        schema: OrdersSchema
    }
]