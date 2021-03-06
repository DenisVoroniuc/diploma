import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { Post, PostDocument } from "../model/post";

export async function createPost(data: DocumentDefinition<PostDocument>): Promise<PostDocument> {
  try {
    return await Post.create(data);
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
}

export function findPost(query: FilterQuery<PostDocument>, options: QueryOptions = { lean: true }) {
  return Post.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<PostDocument>,
  update: UpdateQuery<PostDocument>,
  options: QueryOptions,
) {
  return Post.findOneAndUpdate(query, update, options);
}

export function deletePost(query: FilterQuery<PostDocument>) {
  return Post.deleteOne(query);
}

export function getPosts() {
  return Post.find();
}
