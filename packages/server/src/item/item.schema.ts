import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export type ItemDocument = Item & mongoose.Document;

@Schema()
@ObjectType()
export class Item {
  @Field(() => ID)
  _id: string;

  // Name of the item
  @Prop({ required: true, type: String, unique: true })
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

  // Quantity of the item in the warehouse
  @Prop({ required: true })
  @Field()
  quantity: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

@InputType()
export class CreateItemInput {
  @Field()
  name: string;

  @IsPositive()
  @Field()
  value: number;

  @IsPositive()
  @Field()
  height: number;

  @IsPositive()
  @Field()
  width: number;

  @IsPositive()
  @Field()
  length: number;

  @IsPositive()
  @Field()
  weight: number;

  @IsInt()
  @Min(0)
  @Field()
  quantity: number;
}

@InputType()
export class UpdateItemInput {
  @Field()
  _id: string;

  @IsOptional()
  @Field({ nullable: true })
  name: string;

  @IsPositive()
  @IsOptional()
  @Field({ nullable: true })
  value: number;

  @IsPositive()
  @IsOptional()
  @Field({ nullable: true })
  height: number;

  @IsPositive()
  @IsOptional()
  @Field({ nullable: true })
  width: number;

  @IsPositive()
  @IsOptional()
  @Field({ nullable: true })
  length: number;

  @IsPositive()
  @IsOptional()
  @Field({ nullable: true })
  weight: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Field({ nullable: true })
  quantity: number;
}

@InputType()
export class FilterItemsInput {
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Field({ nullable: true })
  maxValue: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Field({ nullable: true })
  minValue: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Field({ nullable: true })
  minQuantity: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Field({ nullable: true })
  maxQuantity: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Field({ nullable: true })
  maxVolume: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Field({ nullable: true })
  minVolume: number;
}
