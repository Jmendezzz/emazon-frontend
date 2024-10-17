export interface Paginated<T> {
    data: T[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
}