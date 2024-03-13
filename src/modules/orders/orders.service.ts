import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Orders } from "./orders.schema";
import { Model } from "mongoose";

@Injectable()
export class OrdersService {
    @InjectModel(Orders.name) private readonly ordersModel: Model<Orders>

    getOrdersModel(): Model<Orders> {
        return this.ordersModel
    }
}