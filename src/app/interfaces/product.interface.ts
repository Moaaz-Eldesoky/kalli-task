import { Color } from './colors.interface';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  rate: number;
  size: number[];
  video: string;
  colors: Color[];
}
