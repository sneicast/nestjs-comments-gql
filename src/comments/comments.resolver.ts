import { Args, Query, Resolver, Mutation, Subscription } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import {
  AddCommentRequest,
  CommentAddedResponse,
  CommentModel,
} from './comment.model';
import { PubSub } from 'graphql-subscriptions';
import { CommentAddedSubscriptionName } from 'src/common/constants';

const pubSub = new PubSub();
@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}
  @Query(() => [CommentModel])
  async getComments() {
    return this.commentsService.getAllComments();
  }

  @Mutation(() => CommentModel)
  async addComments(@Args() args: AddCommentRequest): Promise<CommentModel> {
    const newComment = await this.commentsService.addComment(
      args.id,
      args.comment,
    );
    const commentAdded: CommentAddedResponse = {
      commentId: newComment.id,
      comment: newComment.comment,
      date: newComment.date,
    };
    pubSub.publish(CommentAddedSubscriptionName, { commentAdded });
    return newComment;
  }

  @Subscription(() => CommentAddedResponse, {
    filter: (payload, variables) =>
      payload.commentAdded.commentId === variables.commentId,
  })
  commentAdded(@Args('commentId') commentId: string) {
    return pubSub.asyncIterator(CommentAddedSubscriptionName);
  }
}
