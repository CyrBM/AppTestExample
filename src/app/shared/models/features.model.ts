export interface Feature {
  path: string;
  title: string;
  activated: boolean;
  icon?: string;
}

export const features: Feature[] = [
  { path: '/home', title: 'Home', activated: true, icon: 'home' },
  { path: '/form', title: 'Form', activated: true },
  { path: '/users', title: 'Users', activated: true },
];
