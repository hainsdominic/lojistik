import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Item,
  CreateItemInput,
  ItemDocument,
  UpdateItemInput,
} from './item.schema';

@Injectable()
export class ItemService {
  item: Partial<Item>[];
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async findMany() {
    return this.itemModel.find().lean();
  }

  async findById(id: string) {
    return this.itemModel.findById(id).lean();
  }

  async create(item: CreateItemInput) {
    // Makes the name lowercase
    item.name = item.name.toLowerCase();

    // Calculates the volume on the fly using the length, the width and the height
    let { length, width, height } = item;

    const volume = this.calculateVolume(length, width, height);

    return this.itemModel.create({ ...item, volume });
  }

  async update(item: UpdateItemInput) {
    // Deletes the null properties
    const cleanedItem = Object.fromEntries(
      Object.entries(item).filter(([_, v]) => v != null),
    );

    // Get the old item from the database
    const foundItem = await this.itemModel.findById(cleanedItem._id);

    // Updates the volume with the most recent values
    // If a value is not updates, item[side] will be undefined and the older value will be used
    const volume = this.calculateVolume(
      cleanedItem.length || foundItem.length,
      cleanedItem.width || foundItem.width,
      cleanedItem.height || foundItem.height,
    );
    return this.itemModel.findByIdAndUpdate(
      cleanedItem._id,
      { ...cleanedItem, volume },
      {
        new: true,
      },
    );
  }

  async delete(id: string) {
    return this.itemModel.findByIdAndRemove(id);
  }

  calculateVolume(length: number, width: number, height: number): number {
    return length * width * height;
  }
}
