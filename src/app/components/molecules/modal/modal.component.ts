import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ESCAPE_KEY } from 'src/app/domain/utils/constants/Common';
import { ModalService } from 'src/app/shared/services/ui/modal.service';

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
