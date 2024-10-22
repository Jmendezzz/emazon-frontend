export interface Brand {
    id: number;
    name: string;
    description: string;
}

export interface CreateBrandRequestDTO {
    name: string;
    description: string;
}