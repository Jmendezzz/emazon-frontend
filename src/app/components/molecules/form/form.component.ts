import { FormField } from '@/domain/models/Form';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
type LengthError = {
  requiredLength: number;
  actualLength: number;
};
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent<T> implements OnInit{
  @Input() fields: FormField[] = [];
  @Input() isLoading = false;
  form!: FormGroup;

  @Output() onSubmit = new EventEmitter<T>();

  constructor(private readonly fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.form = this.fb.group(
      this.fields.reduce((acc: { [key: string]: FormControl }, field) => {
        if(field.type === 'dropdown') {
          acc[field.name] = new FormControl([], field.validators || []);
          return acc;
        }
        acc[field.name] = new FormControl('', field.validators || []);
        return acc;
      }, {})
    );
  }

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  getErrorMessage(name: string): string {
    const control = this.getControl(name);
    if (control.hasError('required') && control.touched) {
      return 'This field is required';
    }

    if (control.hasError('minlength') && control.touched) {
      const error = control.getError('minlength') as LengthError;
      return `This field must be at least ${error.requiredLength} characters long`;
    }

    if (control.hasError('maxlength') && control.touched) {
      const error = control.getError('maxlength') as LengthError;
      return `This field must be at most ${error.requiredLength} characters long`;
    }

    return '';
  }

  submitForm() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
      this.form.reset();
    }
  }
}
