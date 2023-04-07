import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks,
} from 'ng-mocks';
import { UserApiService } from '../shared/services/user-api.service';
import { MockUsers } from '../../tests/mocks/users';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let fixture: MockedComponentFixture<UserListComponent>;
  const serviceSpy = jasmine.createSpyObj<UserApiService>('userApiServiceSpy', [
    'getAllUsers',
  ]);
  serviceSpy.getAllUsers.and.returnValue(of(MockUsers.list));

  beforeEach(() =>
    MockBuilder(UserListComponent).provide({
      provide: UserApiService,
      useValue: serviceSpy,
    })
  );

  beforeEach(() => {
    fixture = MockRender(UserListComponent);
  });

  it('should display a title', () => {
    expect(ngMocks.formatText(ngMocks.find('h3'))).toEqual('Liste des utilisateurs');
  });

  describe('List', () => {
    it('should display 2 items', () => {
      expect(ngMocks.findAll('mat-list-item').length).toEqual(2);

      expect(
        ngMocks.formatText(
          ngMocks.find('mat-list-item:first-of-type > mat-icon')
        )
      ).toEqual('perm_identity');
      expect(
        ngMocks.formatText(
          ngMocks.find('mat-list-item:first-of-type > p:first-of-type')
        )
      ).toEqual(MockUsers.base.name);
      expect(
        ngMocks.formatText(
          ngMocks.find('mat-list-item:first-of-type > p:nth-of-type(2)')
        )
      ).toEqual(`DDN: ${MockUsers.base.birthdate}`);
      expect(
        ngMocks.formatText(
          ngMocks.find('mat-list-item:first-of-type > p:nth-of-type(3)')
        )
      ).toEqual(`TEL: ${MockUsers.base.phone!}`);
      expect(
        ngMocks.formatText(
          ngMocks.find('mat-list-item:first-of-type > p:last-of-type')
        )
      ).toEqual(`EMAIL: ${MockUsers.base.email!}`);

      expect(
        ngMocks.formatText(
          ngMocks.find('mat-list-item:last-of-type > mat-icon')
        )
      ).toEqual('perm_identity');
      expect(
        ngMocks.formatText(
          ngMocks.find('mat-list-item:last-of-type > p:first-of-type')
        )
      ).toEqual(MockUsers.withoutPhoneAndMail.name);
      expect(
        ngMocks.formatText(
          ngMocks.find('mat-list-item:last-of-type > p:nth-of-type(2)')
        )
      ).toEqual(`DDN: ${MockUsers.withoutPhoneAndMail.birthdate}`);
      expect(
        ngMocks.find('mat-list-item:last-of-type > p:nth-of-type(3)', null)
      ).toBeNull();
      expect(
        ngMocks.find('mat-list-item:last-of-type > p:nth-of-type(4)', null)
      ).toBeNull();
    });
  });
});
