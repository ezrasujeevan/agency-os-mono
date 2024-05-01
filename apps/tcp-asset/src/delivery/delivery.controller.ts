import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeliveryService } from './delivery.service';
import { Delivery } from '@agency-os/class';

@Controller()
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @MessagePattern(Delivery.Message.create)
  create(
    @Payload() createDeliveryRequestDto: Delivery.CreateDeliveryRequestDto,
  ) {
    return this.deliveryService.createDelivery(createDeliveryRequestDto);
  }

  @MessagePattern(Delivery.Message.findAll)
  findAll() {
    return this.deliveryService.findAllDelivery();
  }
  @MessagePattern(Delivery.Message.findAllByProject)
  findAllByProject(
    @Payload()
    findAllDeliveryByProjectRequestDto: Delivery.FindAllDeliveryByProjectRequestDto,
  ) {
    return this.deliveryService.findAllDeliveryByProject(
      findAllDeliveryByProjectRequestDto,
    );
  }

  @MessagePattern(Delivery.Message.findOne)
  findOne(
    @Payload() findOneDeliveryRequestDto: Delivery.FindOneDeliveryRequestDto,
  ) {
    return this.deliveryService.findOneDelivery(findOneDeliveryRequestDto);
  }

  @MessagePattern(Delivery.Message.update)
  update(
    @Payload() updateDeliveryRequestDto: Delivery.UpdateDeliveryRequestDto,
  ) {
    return this.deliveryService.updateDelivery(updateDeliveryRequestDto);
  }

  @MessagePattern('removeDelivery')
  remove(
    @Payload() findOneDeliveryRequestDto: Delivery.FindOneDeliveryRequestDto,
  ) {
    return this.deliveryService.removeDelivery(findOneDeliveryRequestDto);
  }
}
