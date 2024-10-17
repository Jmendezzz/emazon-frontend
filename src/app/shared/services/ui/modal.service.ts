import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isModalOpen = new BehaviorSubject<boolean>(false);

  constructor() { }

  getModalObservable() {
    return this.isModalOpen.asObservable();
  }
  openModal() {
    this.isModalOpen.next(true);
  }
  closeModal() {
    this.isModalOpen.next(false);
  }
}
