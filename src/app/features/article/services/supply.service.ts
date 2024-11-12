import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CreateSupplyRequestDTO, SupplyResponseDTO } from '@/domain/models/Supply';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplyService {
  private readonly apiURL = `${environment.transactionServiceUrl}/api/v1/supplies`;

  private readonly supplyCreatedSource = new Subject<void>();

  onSupplyCreated$ = this.supplyCreatedSource.asObservable();
  constructor(private readonly httpClient: HttpClient) {}

  createSupply(createSupply: CreateSupplyRequestDTO): Observable<SupplyResponseDTO> {
    return this.httpClient.post<SupplyResponseDTO>(`${this.apiURL}/create`, {
      ...createSupply
    });
  }

  notifySupplyCreated() {
    this.supplyCreatedSource.next();
  }
}
