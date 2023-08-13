
import { Overbidding } from "./overbidding";



export interface Product {
  id?: number;
  userId?: number;
  categoryId?: number;
  title: string;
  price: number;
  text?: string;
  overbidding?: Overbidding[];
  view?: number;
  startingDate?: Date;
  expirationDate?: Date;
  image: Blob,
}