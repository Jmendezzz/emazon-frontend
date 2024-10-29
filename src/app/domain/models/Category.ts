export interface Category{
    id: number;
    name: string;
    description: string;
}

export interface CreateCategoryRequestDTO{
    name: string;
    description: string;
}

export interface CategoryArticleResponseDTO{
    id:number;
    name:string;
}