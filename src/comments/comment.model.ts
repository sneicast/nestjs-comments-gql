import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentModel {
  @Field()
  id: string;

  @Field()
  comment: string;

  @Field()
  date: string;
}

@ArgsType()
export class AddCommentRequest {
  @Field()
  id: string;

  @Field()
  comment: string;
}

@ObjectType()
export class CommentAddedResponse {
  @Field()
  commentId: string;
  @Field()
  comment: string;

  @Field()
  date: string;
}
// @ObjectType('TaskMetadata')
// export class TaskMetadata {
//   @Field((type) => Task)
//   newTask: Task;
//   @Field()
//   dateAdded: Date;
// }
