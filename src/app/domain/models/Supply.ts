export enum SupplyStatus {
    PENDING = 'PENDING',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED'
}

export interface CreateSupplyRequestDTO{
    quantity: number;
    availableAt: Date;
    articleId: number;
}

export interface SupplyResponseDTO {
    id: number;
    articleId: number;
    quantity: number;
    status: SupplyStatus;
    createdBy: number;
    createdAt: Date;
    availableAt: Date;
}