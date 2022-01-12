import { ValidationPipe } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  Item,
  CreateItemInput,
  UpdateItemInput,
  FilterItemsInput,
} from './item.schema';
import { ItemService } from './item.service';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  // Get all items
  @Query(() => [Item])
  async items() {
    return this.itemService.findMany();
  }

  // Get an item by id
  @Query(() => Item)
  async item(@Args('id') _id: string) {
    return this.itemService.findById(_id);
  }

  @Query(() => [Item])
  async filterItems(@Args('filter') filters: FilterItemsInput) {
    return this.itemService.filterItems(filters);
  }

  // Create an item
  @Mutation(() => Item)
  async createItem(@Args('input') item: CreateItemInput) {
    return this.itemService.create(item);
  }

  // Update an item by id
  @Mutation(() => Item)
  async updateItem(
    @Args('input')
    item: UpdateItemInput,
  ) {
    return this.itemService.update(item);
  }

  // Delete an item by id
  @Mutation(() => Item)
  async deleteItem(@Args('id') _id: string) {
    return this.itemService.delete(_id);
  }
}
