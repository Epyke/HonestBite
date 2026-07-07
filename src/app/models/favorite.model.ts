import { RestaurantListItem } from "./restaurant.model";

export interface FavoriteStatus {
    favorited: boolean;
}

export interface UserFavorite {
  id: number; 
  favoritedAt: string;
  restaurant: RestaurantListItem[];
}