import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageComponent } from './form-page.component';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks,
} from 'ng-mocks';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MockFeatures } from '../../tests/mocks/features';
import { UserApiService } from './shared/services/user-api.service';

describe('FormPageComponent', () => {
  let fixture: MockedComponentFixture<FormPageComponent>;
  const serviceSpy = jasmine.createSpyObj('userApiServiceSpy', ['saveUser']);

  beforeEach(() => MockBuilder(FormPageComponent).keep(ReactiveFormsModule).provide({provide: UserApiService, useValue: serviceSpy}));

  beforeEach(() => {
    fixture = MockRender(FormPageComponent);
  });

  it('should display a title', () => {
    expect(ngMocks.formatText(ngMocks.find('h3'))).toEqual('Formulaire');
  });

  describe('Form', () => {
    describe('Basic form', () => {
      it('should not contain advanced fields', () => {
        expect(ngMocks.find('[formControlName="email"]', null)).toBeNull();
        expect(ngMocks.find('[formControlName="phone"]', null)).toBeNull();
      });

      it('should be invalid', () => {
        expect(fixture.componentInstance.formGroup.invalid).toBeTrue();
      });

      it('should be valid', () => {
        ngMocks.change('[formControlName="name"]', 'test');
        ngMocks.change('[formControlName="birthdate"]', new Date('2020-11-11'));
        fixture.detectChanges();
        expect(fixture.componentInstance.formGroup.valid).toBeTrue();
      });

      describe('Name', () => {
        it('should display a name field', () => {
          expect(ngMocks.find('mat-form-field:first-of-type')).not.toBeNull();
          expect(
            ngMocks.formatText(
              ngMocks.find('mat-form-field:first-of-type > mat-label')
            )
          ).toEqual('Nom');
          expect(
            ngMocks.find('mat-form-field:first-of-type > input')
          ).not.toBeNull();
        });

        it('should display an error message (error required)', () => {
          ngMocks.change('[formControlName="name"]', '');
          fixture.detectChanges();
          expect(
            ngMocks.formatText(ngMocks.find('mat-error#nameError'))
          ).toEqual('Veuillez remplir ce champs');
        });
      });

      describe('Birthdate', () => {
        it('should display a birthdate field', () => {
          expect(ngMocks.find('mat-form-field:nth-of-type(2)')).not.toBeNull();
          expect(
            ngMocks.formatText(
              ngMocks.find('mat-form-field:nth-of-type(2) > mat-label')
            )
          ).toEqual('Date de naissance');
          expect(
            ngMocks.find('mat-form-field:nth-of-type(2) > input')
          ).not.toBeNull();
          expect(
            ngMocks.find(
              'mat-form-field:nth-of-type(2) > mat-datepicker-toggle'
            )
          ).not.toBeNull();
          expect(
            ngMocks.find('mat-form-field:nth-of-type(2) > mat-datepicker')
          ).not.toBeNull();
        });

        it('should display an error message (error required)', () => {
          ngMocks.change('[formControlName="birthdate"]', '');
          fixture.detectChanges();
          expect(
            ngMocks.formatText(ngMocks.find('mat-error#birthdateError'))
          ).toEqual('Veuillez saisir une date de naissance');
        });
      });

      describe('AdvancedForm checkbox', () => {
        it('should display a AdvancedForm field', () => {
          expect(ngMocks.find('mat-checkbox')).not.toBeNull();
          expect(ngMocks.formatText(ngMocks.find('mat-checkbox'))).toEqual(
            'Cacher le formulaire avancé'
          );
        });
      });
    });

    describe('Advanced form', () => {
      beforeEach(() => {
        ngMocks.change('[formControlName="advancedForm"]', true);
        fixture.detectChanges();
      });

      it('should be valid', () => {
        ngMocks.change('[formControlName="name"]', 'test');
        ngMocks.change('[formControlName="birthdate"]', new Date('2020-11-11'));
        ngMocks.change('[formControlName="phone"]', '0606060606');
        ngMocks.change('[formControlName="email"]', 'email@email.fr');
        fixture.detectChanges();
        expect(fixture.componentInstance.formGroup.valid).toBeTrue();
      });

      it('should contain advanced fields', () => {
        expect(ngMocks.find('[formControlName="email"]', null)).not.toBeNull();
        expect(ngMocks.find('[formControlName="phone"]', null)).not.toBeNull();
      });

      describe('Email', () => {
        it('should display a email field', () => {
          expect(ngMocks.find('mat-form-field:nth-of-type(3)')).not.toBeNull();
          expect(
            ngMocks.formatText(
              ngMocks.find('mat-form-field:nth-of-type(3) > mat-label')
            )
          ).toEqual('Email');
          expect(
            ngMocks.find('mat-form-field:nth-of-type(3) > input')
          ).not.toBeNull();
        });

        it('should display an error message (error required)', () => {
          ngMocks.change('[formControlName="email"]', '');
          fixture.detectChanges();
          expect(
            ngMocks.formatText(ngMocks.find('mat-error#emailError'))
          ).toEqual('Veuillez saisir une adresse email');
        });
      });

      describe('Phone', () => {
        it('should display a email field', () => {
          expect(ngMocks.find('mat-form-field:last-of-type')).not.toBeNull();
          expect(
            ngMocks.formatText(
              ngMocks.find('mat-form-field:last-of-type > mat-label')
            )
          ).toEqual('Téléphone');
          expect(
            ngMocks.find('mat-form-field:last-of-type > input')
          ).not.toBeNull();
        });

        it('should display an error message (error required)', () => {
          ngMocks.change('[formControlName="phone"]', '');
          fixture.detectChanges();
          expect(
            ngMocks.formatText(ngMocks.find('mat-error#phoneError'))
          ).toEqual('Veuillez saisir un numéro de téléphone');
        });
      });
    });

    describe('Submit button', () => {
      it('should mark as touched when form is invalid', () => {
        expect(fixture.componentInstance.name.touched).toBeFalse();
        expect(fixture.componentInstance.birthdate.touched).toBeFalse();
        expect(
          fixture.componentInstance.advancedFormControl.touched
        ).toBeFalse();

        ngMocks.trigger('button', 'click');
        fixture.detectChanges();

        expect(fixture.componentInstance.name.touched).toBeTrue();
        expect(fixture.componentInstance.birthdate.touched).toBeTrue();
        expect(
          fixture.componentInstance.advancedFormControl.touched
        ).toBeTrue();
      });

      it('should call the service to save user date', () => {
        ngMocks.change('[formControlName="name"]', 'test');
        ngMocks.change('[formControlName="birthdate"]', new Date('11/11/2020'));
        ngMocks.trigger('button', 'click');
        fixture.detectChanges();

        expect(serviceSpy.saveUser).toHaveBeenCalledWith( {name: 'test', birthdate: '11/11/2020', phone: undefined, email: undefined});
      });
    });
  });
});
