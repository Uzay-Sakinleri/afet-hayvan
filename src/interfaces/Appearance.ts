import { FurColor } from "./FurColor";
import { EyeColor } from "./EyeColor";

export interface Appearance {
  appearanceId: number;
  furColor: FurColor;
  eyeColor: EyeColor;
  accesory: string;
}
