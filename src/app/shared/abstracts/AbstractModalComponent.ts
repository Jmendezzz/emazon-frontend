import { OnInit, OnDestroy, Input, Directive } from '@angular/core';
import { ModalService } from '@/shared/services/ui/modal.service';
import { Subscription } from 'rxjs';

@Directive() 
export abstract class BaseModalComponent implements OnInit, OnDestroy {
  @Input() modalId!: string; 
  isModalOpen = false;
  private subscription: Subscription | undefined;

  constructor(protected modalService: ModalService) {}

  ngOnInit(): void {
    this.subscription = this.modalService.getModalObservable(this.modalId).subscribe(isOpen => {
      this.isModalOpen = isOpen;
    });
  }

  openModal() {
    this.modalService.openModal(this.modalId);
  }

  closeModal() {
    this.modalService.closeModal(this.modalId);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
