import { ESCAPE_KEY } from '@/domain/utils/constants/Common';
import { ModalService } from '@/shared/services/ui/modal.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';
  isOpen = false;

  constructor(private readonly modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.getModalObservable().subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyDown($event: KeyboardEvent) {
    if ($event.key === ESCAPE_KEY) {
      this.closeModal();
    }
  }
}
