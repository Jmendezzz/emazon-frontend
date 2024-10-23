import { FormControl, FormGroup } from "@angular/forms";

export function getFormControl(form: FormGroup, name: string): FormControl {
  return form.get(name) as FormControl;
}

type LengthError = {
    requiredLength: number;
    actualLength: number;
}
export function getFormControlErrorMessage(control: FormControl): string {
  if (control.hasError("required") && control.touched) {
    return "This field is required";
  }

  if(control.hasError("minlength") && control.touched) {
    const error = control.getError("minlength") as LengthError;
    return `This field must be at least ${error.requiredLength} characters long`;
  }

    if(control.hasError("maxlength") && control.touched) {
        const error = control.getError("maxlength") as LengthError;
        return `This field must be at most ${error.requiredLength} characters long`;
    }

  return "";
}