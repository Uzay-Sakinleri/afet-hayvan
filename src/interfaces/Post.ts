import { Animal } from "./Animal";

export interface Post {
  postID: number;
  userID: number;
  title: string;
  content: string;
  animal: Animal;
  createdAt: Date;
  completedAt?: Date;
  status: string;
}
