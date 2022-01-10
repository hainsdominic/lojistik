import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Mutation,
} from '@nestjs/graphql';
import {
  Item,
  CreateItemInput,
  FindItemInput,
  UpdateItemInput,
} from './item.schema';
import { ItemService } from './item.service';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @Query(() => [Item]) // <-- what will the query return?
  async items /* <-- Query name */() {
    return this.itemService.findMany(); // Resolve the query
  }

  @Query(() => Item)
  async item(@Args('input') { _id }: FindItemInput) {
    return this.itemService.findById(_id);
  }

  @Mutation(() => Item)
  async createItem(@Args('input') item: CreateItemInput) {
    return this.itemService.create(item);
  }

  @Mutation(() => Item)
  async updateItem(@Args('input') item: UpdateItemInput) {
    return this.itemService.update(item);
  }

  @Mutation(() => Item)
  async deleteItem(@Args('id') _id: string) {
    return this.itemService.delete(_id);
  }
}
