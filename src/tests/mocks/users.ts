import { User } from '../../app/shared/models/user.model';

export abstract class MockUsers {
  static readonly base: User = {
    name: 'User1',
    birthdate: '15/04/2023',
    email: 'ng-mock@test.fr',
    phone: '0584847623',
  };

  static readonly withoutPhoneAndMail: User = {
    name: 'User2',
    birthdate: '15/12/2023',
  };

  static list: User[] = [MockUsers.base, MockUsers.withoutPhoneAndMail];
}
