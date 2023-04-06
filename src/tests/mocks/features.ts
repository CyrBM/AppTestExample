import { Feature } from '../../app/shared/models/features.model';

export abstract class MockFeatures {
  static readonly base: Feature[] = [
    { path: '/home', title: 'Home', activated: true, icon: 'home' },
    { path: '/form', title: 'Form', activated: true },
    { path: '/service', title: 'Service', activated: false },
  ];
}
