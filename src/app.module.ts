import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DemoService } from './demo/demo.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': true,
        // 'graphql-ws': true,
      },
      playground: true,
    }),
    CommentsModule,
  ],
  controllers: [],
  providers: [DemoService],
})
export class AppModule {}
