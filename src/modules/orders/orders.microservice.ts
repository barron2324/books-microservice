import { Controller, InternalServerErrorException, Logger } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ORDERS_CMD } from "src/constants";
import { ordersInterface } from "./interfaces/orders.interfaces";

@Controller('orders')
export class OrdersController {
    private readonly logger = new Logger(OrdersController.name)
    constructor(
        private readonly ordersService: OrdersService
    ) { }

    @MessagePattern({
        cmd: ORDERS_CMD,
        method: 'create-order',
    })
    async createOrder(
        @Payload() payload: ordersInterface,
    ): Promise<void> {
        try {
            await this.ordersService.getOrdersModel().create(payload)
        } catch (e) {
            this.logger.error(
                `catch on createOrder: ${e?.message ?? JSON.stringify(e)}`,
            )
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            })
        }
    }
}