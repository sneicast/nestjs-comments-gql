import { Injectable } from '@nestjs/common';
import { CommentModel } from './comment.model';

@Injectable()
export class CommentsService {
  private comments: CommentModel[];
  constructor() {
    this.comments = new Array<CommentModel>();
  }

  getAllComments() {
    return this.comments;
  }
  addComment(id: string, comment: string) {
    const newComment = new CommentModel();
    newComment.id = id;
    newComment.comment = comment;
    newComment.date = new Date().toDateString();
    this.comments.push(newComment);
    return newComment;
  }
}
