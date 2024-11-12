export interface TableAction<T> {
    label: string;
    icon: string;
    action: (item: T) => void;
}