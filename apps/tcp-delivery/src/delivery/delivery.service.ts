import { Delivery } from '@agency-os/class';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliveryService {
  create(createDeliveryDto: Delivery.CreateDeliveryRequestDto) {
    return 'This action adds a new delivery';
  }

  findAll() {
    return `This action returns all delivery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} delivery`;
  }

  update(id: string, updateDeliveryDto: Delivery.UpdateDeliveryRequestDto) {
    return `This action updates a #${id} delivery`;
  }

  remove(id: number) {
    return `This action removes a #${id} delivery`;
  }
}
