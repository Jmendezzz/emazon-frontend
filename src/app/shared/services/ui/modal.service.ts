import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: { [key: string]: BehaviorSubject<boolean> } = {};

  constructor() {}

  getModalObservable(modalId: string): Observable<boolean> {
    if (!this.modals[modalId]) {
      this.modals[modalId] = new BehaviorSubject<boolean>(false);
    }
    return this.modals[modalId].asObservable();
  }

  openModal(modalId: string): void {
    if (!this.modals[modalId]) {
      this.modals[modalId] = new BehaviorSubject<boolean>(false);
    }
    this.modals[modalId].next(true);
  }

  closeModal(modalId: string): void {
    if (!this.modals[modalId]) {
      this.modals[modalId] = new BehaviorSubject<boolean>(false);
    }
    this.modals[modalId].next(false);
  }
}
