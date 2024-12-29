import { Global, Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { MongoModule } from './mongo/mongo.module';
import { ConfigModule } from './config/config.module';
@Global()
@Module({
  imports: [GraphqlModule, MongoModule, ConfigModule],
  exports: [GraphqlModule, MongoModule, ConfigModule],
})
export class CommonModule {}
