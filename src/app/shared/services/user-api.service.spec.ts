import { TestBed } from '@angular/core/testing';

import { UserApiService } from './user-api.service';
import { User } from '../models/user.model';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MockUsers } from '../../../tests/mocks/users';

describe('UserApiService', () => {
  let service: UserApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new UserApiService(httpClientSpy);
  });

  it('should return all users', (done: DoneFn) => {
    const expectedUser: User[] = [MockUsers.base];
    httpClientSpy.get.and.returnValue(of(expectedUser));

    service.getAllUsers().subscribe({
      next: user => {
        expect(user).toEqual(expectedUser);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get).toHaveBeenCalledOnceWith('/api/users');
  });

  it('should save a new User', () => {
    service.saveUser(MockUsers.base);
    expect(httpClientSpy.post).toHaveBeenCalledOnceWith(
      '/api/users',
      MockUsers.base
    );
  });
});
