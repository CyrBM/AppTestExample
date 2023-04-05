import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks,
} from 'ng-mocks';

describe('LandingPageComponent', () => {
  let fixture: MockedComponentFixture<LandingPageComponent>;

  ngMocks.faster();

  beforeAll(() => MockBuilder(LandingPageComponent));

  beforeAll(() => {
    fixture = MockRender(LandingPageComponent);
  });

  it('should display a title', () => {
    expect(ngMocks.formatText(ngMocks.find('h3'))).toEqual("Page d'accueil");
  });

  it('should display some texts', () => {
    expect(ngMocks.formatText(ngMocks.find('p#id1'))).toEqual(
      "il s'agit de la page d'accueil de l'application d'exemples,"
    );
    expect(ngMocks.formatText(ngMocks.find('p[class="target"]'))).toEqual(
      "Cliquez sur le bouton du menu afin d'acceder à des exemples plus poussés."
    );
  });
});
