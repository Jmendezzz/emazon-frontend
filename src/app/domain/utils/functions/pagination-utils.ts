import { Pagination } from "@/domain/models/Pagination";
import { Sorting } from "@/domain/models/Sorting";
import { PAGE_OFFSET } from "../constants/Pagination";

export function buildPaginationParams(pagination: Pagination, sorting?: Sorting){
    const params: { [key: string]: any } = {}
    if (pagination.page) {
        params['page'] = (typeof pagination.page === 'number' ? pagination.page : parseInt(pagination.page, 10)) - PAGE_OFFSET;
    }
    if (pagination.size) {
        params['size'] = pagination.size;
    }
    if (sorting?.sortBy) {
        params['sortBy'] = sorting.sortBy;
    }
    if (sorting?.direction) {
        params['direction'] = sorting.direction.toUpperCase();
    }
    return params;
}