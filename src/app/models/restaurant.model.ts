import { Address } from "./adress.model";
import { Category } from "./category.model";
import { Review } from "./review.model";
import { Schedule } from "./schedule.model";

export interface RestaurantDetail {
  id: number; 
  name: string;
  mapsUrl: string;
  cover: string;
  logo: string;
  distance: string;
  city: string;
  category: string;
  avgPrice: string;
  global: number;
  description: string;
  reviews: Review[];
  schedule: Schedule[];
  menuPhotos: string[];
}

export interface RestaurantListItem {
  id: number; 
  name: string; 
  cover: string;
  avgPrice: number; 
  global: number;
  adress: Address;
  categories: Category[];
}