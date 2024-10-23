import { ModalService } from '@/shared/services/ui/modal.service';
import { Component, OnInit} from '@angular/core';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-create-brand-modal',
  templateUrl: './create-brand-modal.component.html',
  styleUrls: ['./create-brand-modal.component.scss']
})
export class CreateBrandModalComponent implements OnInit{

  constructor(private readonly modalService:ModalService, private readonly brandService: BrandService) { }

  ngOnInit(): void {
    this.brandService.onBrandCreated$.subscribe(() => {
      this.modalService.closeModal();
    });
  }

  openModal(){
    this.modalService.openModal();
  }

}
