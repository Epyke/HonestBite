export interface CreateRatingRequest {
    restaurantId: number;
    score: number;
    comment: string;
}

export interface CreateRatingResponse {
    response: string;
}