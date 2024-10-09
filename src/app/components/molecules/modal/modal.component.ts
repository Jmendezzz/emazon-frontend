import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/ui/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';
  isOpen = false;

  constructor(private modalService: ModalService) {
   }

  ngOnInit(): void {
    this.modalService.getModalObservable().subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
