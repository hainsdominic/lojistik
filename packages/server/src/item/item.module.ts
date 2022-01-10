import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemResolver } from './item.resolver';
import { Item, ItemSchema } from './item.schema';
import { ItemService } from './item.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  providers: [ItemResolver, ItemService],
})
export class ItemModule {}
