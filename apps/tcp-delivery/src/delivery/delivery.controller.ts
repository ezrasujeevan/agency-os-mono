import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeliveryService } from './delivery.service';
import { Delivery } from '@agency-os/class';


@Controller()
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @MessagePattern('createDelivery')
  create(@Payload() createDeliveryDto: Delivery.CreateDeliveryRequestDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @MessagePattern('findAllDelivery')
  findAll() {
    return this.deliveryService.findAll();
  }

  @MessagePattern('findOneDelivery')
  findOne(@Payload() id: number) {
    return this.deliveryService.findOne(id);
  }

  @MessagePattern('updateDelivery')
  update(@Payload() updateDeliveryDto: Delivery.UpdateDeliveryRequestDto) {
    return this.deliveryService.update(updateDeliveryDto.id, updateDeliveryDto);
  }

  @MessagePattern('removeDelivery')
  remove(@Payload() id: number) {
    return this.deliveryService.remove(id);
  }
}
