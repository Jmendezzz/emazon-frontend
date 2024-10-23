import { InputType } from "@/components/atoms/input/input-types";
import { ValidatorFn} from "@angular/forms";

export interface FormField {
    name: string;
    label: string;
    placeholder?: string;
    type: InputType,
    validators?: ValidatorFn[];
    options?: string[];
}