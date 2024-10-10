import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category-form',
  templateUrl: './create-category-form.component.html',
  styleUrls: ['./create-category-form.component.scss']
})
export class CreateCategoryFormComponent implements OnInit {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
   }

  ngOnInit(): void {
  }
  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  getErrorMessage(name: string): string {
    const control = this.getControl(name);
    if (control.hasError('required') && control.touched) {
      return 'This field is required';
    }
    return '';
  }

  onCreate(){
    console.log(this.form.value);
  }

}
