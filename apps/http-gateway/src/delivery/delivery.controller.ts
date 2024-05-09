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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Delivery } from '@agency-os/class';

@ApiTags('delivery')
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
    @Body() updateDeliveryRequestDto: Delivery.UpdateDeliveryRequestDto,
  ) {
    updateDeliveryRequestDto.id = id;
    return this.deliveryService.updateDelivery(updateDeliveryRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryService.removeDelivery({ id });
  }

  @Post(':id/file')
  createFile(
    @Param('id') id: string,
    @Body() createDeliveryFileRequestDto: Delivery.createDeliveryFileRequestDto,
  ) {
    createDeliveryFileRequestDto.deliveryId = id;
    return this.deliveryService.createNewDeliveryFile(
      createDeliveryFileRequestDto,
    );
  }
  @Get(':id/file')
  findAllFile(@Param('id') id: string) {
    return this.deliveryService.getAllFilesForDelivery({ deliveryId: id });
  }
}
