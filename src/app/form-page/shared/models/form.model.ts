import { FormControl } from '@angular/forms';

export interface FormModel {
  name: FormControl<string | null>;
  birthdate: FormControl<Date | null>;
  advancedForm: FormControl<boolean | null>;
  email?: FormControl<string | null>;
  phone?: FormControl<string | null>;
}
