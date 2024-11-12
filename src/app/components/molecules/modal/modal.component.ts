import { ESCAPE_KEY } from '@/domain/utils/constants/Common';
import { ModalService } from '@/shared/services/ui/modal.service';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  {
  @Input() title: string = '';
  @Input() modalId!: string; 
  @Input() isOpen = false;

  constructor(private readonly modalService: ModalService) {}

  closeModal() {
    this.modalService.closeModal(this.modalId); 
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown($event: KeyboardEvent) {
    if ($event.key === ESCAPE_KEY) {
      this.closeModal();
    }
  }
}
