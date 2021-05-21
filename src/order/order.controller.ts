import { ClassSerializerInterceptor, Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderService } from './order.service';

@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(AuthGuard)
@Controller()
export class OrderController {

    constructor(private orderService: OrderService) {}


    @Get('orders')
    all(@Query('page') page = 1) {
        // return this.orderService.all(['order_items']);
        return this.orderService.paginate(page, ['order_items']);
    }

}
