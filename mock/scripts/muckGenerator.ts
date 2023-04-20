import { faker } from "@faker-js/faker";
import type { Thumbnail } from "@interfaces/Thumbnail";

const muckGenerate = async (count:number): Promise<Thumbnail[]> => {
  const muck: Thumbnail[] = [];
  for (let i = 0; i < count; i++) {
    muck.push({
      postId: faker.datatype.number({ min: 0, max: 10 }),
      name: faker.lorem.sentence(),
      username: faker.internet.userName(),
      animalName: faker.name.firstName(),
      status: faker.lorem.word(),
      createdAt: faker.date.past(),
      completedAt: faker.date.soon(),
      imagePath: "../../mock/images/cat_mock.jpg",
    });
  }
  return muck;
}
export default muckGenerate;
