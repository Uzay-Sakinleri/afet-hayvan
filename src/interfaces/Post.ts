import {User } from "./User";
import { Animal } from "./Animal";

export interface Post {
  postId: number;
  name: string;
  user: User;
  animal: Animal;
  createdAt: Date;
  completedAt?: Date;
  status: string;
}
