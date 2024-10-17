export type SortingDirection = 'ASC' | 'DESC';
export interface Sorting {
  sortBy: string | null;
  direction: SortingDirection |  string |null; 
}
