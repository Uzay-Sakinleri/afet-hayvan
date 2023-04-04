export interface Post {
    postId: number;
    name: string;
    username: string;
    animalname: string;
    imagePath: string;
    createdAt: Date;
    completedAt?: Date;
    status: string;
  }