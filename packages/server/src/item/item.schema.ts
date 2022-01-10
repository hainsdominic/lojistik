import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

export type ItemDocument = Item & mongoose.Document;

@Schema()
@ObjectType()
export class Item {
  @Field(() => ID)
  _id: string;

  // Name of the item
  @Prop({ required: true })
  @Field()
  name: string;

  // Value of the item in $USD
  @Prop({ required: true })
  @Field()
  value: number;

  // Height of the item in centimeters
  @Prop({ required: true })
  @Field()
  height: number;

  // Width of the item in centimeters
  @Prop({ required: true })
  @Field()
  width: number;

  // Length of the item in centimeters
  @Prop({ required: true })
  @Field()
  length: number;

  // Weight of the item in grams
  @Prop({ required: true })
  @Field()
  weight: number;

  // Volume of the item in centimeters cube
  @Prop({ required: true })
  @Field()
  volume: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

@InputType()
export class CreateItemInput {
  @Field()
  name: string;

  @Field()
  value: number;

  @Field()
  height: number;

  @Field()
  width: number;

  @Field()
  length: number;

  @Field()
  weight: number;
}

@InputType()
export class UpdateItemInput {
  @Field()
  _id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  value?: number;

  @Field({ nullable: true })
  height?: number;

  @Field({ nullable: true })
  width?: number;

  @Field({ nullable: true })
  length?: number;

  @Field({ nullable: true })
  weight?: number;
}
