import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormModel } from './shared/form.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MAT_LUXON_DATE_ADAPTER_OPTIONS,
  MatLuxonDateModule,
} from '@angular/material-luxon-adapter';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatLuxonDateModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  providers: [
    { provide: MAT_LUXON_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
})
export class FormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  formGroup = this.fb.group<FormModel>({
    birthdate: new FormControl(null, { validators: [Validators.required] }),
    name: new FormControl(null, { validators: Validators.required }),
    advancedForm: new FormControl(false, { validators: Validators.required }),
  });

  ngOnInit(): void {
    this.formGroup
      .get('advancedForm')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe(isCheck => {
        if (isCheck) {
          this.formGroup.addControl(
            'email',
            new FormControl(null, Validators.required)
          );
          this.formGroup.addControl(
            'phone',
            new FormControl(null, Validators.required)
          );
        } else {
          this.formGroup.removeControl('email');
          this.formGroup.removeControl('phone');
        }
      });
  }

  get name(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  get birthdate(): FormControl {
    return this.formGroup.get('birthdate') as FormControl;
  }

  get advancedFormControl(): FormControl {
    return this.formGroup.get('advancedForm') as FormControl;
  }

  get email(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get phone(): FormControl {
    return this.formGroup.get('phone') as FormControl;
  }
}
