import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { ApiQuery } from '@nestjs/swagger';
import { Delivery } from '@agency-os/class';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  create(@Body() createDeliveryRequestDto: Delivery.CreateDeliveryRequestDto) {
    return this.deliveryService.createDelivery(createDeliveryRequestDto);
  }

  @ApiQuery({ name: 'project', required: false })
  @Get()
  findAll(@Query('project') projectId?: string) {
    if (projectId) {
      return this.deliveryService.findAllDeliveryByProject({ projectId });
    }
    return this.deliveryService.findAllDelivery();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryService.findOneDelivery({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    updateDeliveryDto.id = id;
    return this.deliveryService.updateDelivery(updateDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryService.removeDelivery({ id });
  }
}
