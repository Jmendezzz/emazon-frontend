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

export const BRAND_TABLE_HEADERS: TableHeader[] = [
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

export const ARTICLE_TABLE_HEADERS: TableHeader[] = [{
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
},
{
    label: 'Price',
    key: 'price',
    sortable: false
},
{
    label: 'Stock',
    key: 'stock',
    sortable: false
},
{
    label: 'Brand',
    key: 'brand',
    sortable: true
},
{
    label: 'Categories',
    key: 'category',
    sortable: true
}]