import { Article } from '@/domain/models/Article';
import { FormField } from '@/domain/models/Form';
import { SupplyResponseDTO } from '@/domain/models/Supply';
import { AbstractFormHandler } from '@/shared/abstracts/AbstractFormHandler';
import { ToastService } from '@/shared/services/ui/toast.service';
import { Component, Input} from '@angular/core';
import { Validators } from '@angular/forms';
import { SupplyService } from '../../services/supply.service';
import { SUPPLY_CREATED_FAILED, SUPPLY_CREATED_SUCCESSFULLY } from '@/domain/utils/constants/Supply';
import { futureDateValidator } from '@/shared/validators/future-date-validator';

@Component({
  selector: 'app-add-article-supply-form',
  templateUrl: './add-article-supply-form.component.html',
  styleUrls: ['./add-article-supply-form.component.scss']
})
export class AddArticleSupplyFormComponent extends AbstractFormHandler<SupplyResponseDTO>{
  @Input() articleId!:number;

  fields: FormField[] = [
    {
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
      validators: [Validators.required, Validators.min(1)],
    },
    {
      name: 'availableAt',
      label: 'Available At',
      type: 'date-time',
      validators: [Validators.required, futureDateValidator()],
    },
  ]

  constructor(toastService: ToastService, private readonly supplyService: SupplyService) {
    super(toastService);
  }


  onSubmit({quantity, availableAt}: { quantity: number, availableAt:Date }): void {
    this.handleFormSubmit(
      () => this.supplyService.createSupply({quantity, availableAt, articleId: this.articleId}),
      SUPPLY_CREATED_SUCCESSFULLY,
      SUPPLY_CREATED_FAILED,
      () => this.supplyService.notifySupplyCreated()
    )

  }

  

}
