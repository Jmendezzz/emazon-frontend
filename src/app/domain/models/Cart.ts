import { Article } from "./Article";
import { Paginated } from "./Paginated";

export interface AddArticleToCartRequestDTO {
    articleId: number;
    quantity: number;
}

export interface ResponseDTO{
    message: string;
}
export interface CartArticleDTO {
    article: Article;
    quantity: number;
}
export interface CartItemsResponseDTO {
    paginatedArticles: Paginated<CartArticleDTO>,
    totalPrice: number;
}