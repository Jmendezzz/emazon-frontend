import { Component } from '@angular/core';
import { ModalService } from '@/shared/services/ui/modal.service';
import { BrandService } from '../../services/brand.service';
import { BaseModalComponent } from '@/shared/abstracts/AbstractModalComponent';

@Component({
  selector: 'app-create-brand-modal',
  templateUrl: './create-brand-modal.component.html',
  styleUrls: ['./create-brand-modal.component.scss']
})
export class CreateBrandModalComponent extends BaseModalComponent {
  constructor(
    modalService: ModalService,
    private readonly brandService: BrandService
  ) {
    super(modalService);
    this.modalId = 'createBrandModal'; 
  }

  override ngOnInit(): void {
    super.ngOnInit(); 

    this.brandService.onBrandCreated$.subscribe(() => {
      this.closeModal();
    });
  }
}
