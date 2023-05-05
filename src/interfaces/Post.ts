import { Animal } from "./Animal";

export interface Post {
  postid: number;
  userid: number;
  title: string;
  content: string;
  animal: Animal;
  createdat: Date;
  completedat?: Date;
  status: string;
}
