import { TableHeader } from "../../models/TableHeader";

export const CATEGORY_TABLE_HEADERS: TableHeader[] = [
    {
        label: 'ID',
        key: 'id',
        sortable: false
    },
    {
        label: 'Name',
        key: 'name',
        sortable: true
    },
    {
        label: 'Description',
        key: 'description',
        sortable: false
    }
]