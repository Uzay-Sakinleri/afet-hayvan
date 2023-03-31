import { Appearance } from "./Appearance";
import { Breed } from "./Breed";
import { Specie } from "./Specie";

export interface Animal {
  animalId: number;
  name: string;
  appearance: Appearance;
  breed: Breed;
  specie: Specie;
  imagePath: string;
}
