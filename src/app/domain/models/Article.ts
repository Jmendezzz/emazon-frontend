import { Brand } from "./Brand";
import { CategoryArticleResponseDTO } from "./Category";

export interface Article {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    brand:Brand;
    categories: CategoryArticleResponseDTO[];
    supplyDate?: Date;
}

export interface CreateArticleRequestDTO {
    name: string;
    description: string;
    price: number;
    stock: number;
    brandId: number;
    categoriesIds: number[];
}
export interface ArticleSearchCriteria{
    categoryId?: number;
    brandId?: number;
}