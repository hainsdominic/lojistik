import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // I hardcoded the URI to simplify demo. If you plan on using,
    // create an environment variable.
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/lojistik'),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
