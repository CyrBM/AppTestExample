import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks,
} from 'ng-mocks';
import { AppModule } from './app.module';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { MockFeatures } from '../tests/mocks/features';
import { MatListItem } from '@angular/material/list';

describe('AppComponent', () => {
  let fixture: MockedComponentFixture<AppComponent>;

  ngMocks.faster();

  beforeAll(() => MockBuilder(AppComponent, AppModule));

  beforeAll(() => {
    fixture = MockRender(AppComponent);
  });

  describe('Toolbar', () => {
    it('should display a toolbar', () => {
      const toolbar = ngMocks.get('mat-toolbar', MatToolbar);
      expect(toolbar).not.toBeNull();
      expect(toolbar.color).toEqual('primary');
    });

    it('should display a menu button', () => {
      expect(ngMocks.find('button:first-of-type', null)).not.toBeNull();
      expect(
        ngMocks.find('button:first-of-type').nativeElement.ariaLabel
      ).toEqual('Menu');
      expect(
        ngMocks.formatText(ngMocks.find('button:first-of-type > mat-icon'))
      ).toEqual('menu');
    });

    it('should display a home button', () => {
      expect(ngMocks.find('button:nth-of-type(2)', null)).not.toBeNull();
      expect(
        ngMocks.find('button:nth-of-type(2)').nativeElement.ariaLabel
      ).toEqual('Go back to home');
      expect(ngMocks.get('button:nth-of-type(2)', MatTooltip).message).toEqual(
        'Go back to home'
      );
      expect(
        ngMocks.formatText(ngMocks.find('button:nth-of-type(2) > mat-icon'))
      ).toEqual('home');
    });

    it('should display a title', () => {
      expect(ngMocks.formatText(ngMocks.find('h1'))).toEqual(
        'Testing with ngMocks'
      );
    });
  });

  describe('Navbar', () => {
    it('should display a mat drawer container without backdrop', () => {
      expect(
        ngMocks.get('mat-drawer-container', MatDrawerContainer).hasBackdrop
      ).toBeFalse();
    });

    describe('Menu', () => {
      it('should display a side menu', () => {
        expect(ngMocks.get('mat-drawer', MatDrawer).mode).toEqual('side');
        expect(ngMocks.findAll('a').length).toEqual(3);
      });

      it('should display a home menu item', () => {
        expect(ngMocks.get('a:first-of-type', RouterLink).routerLink).toEqual([
          MockFeatures.base[0].path,
        ]);
        expect(ngMocks.get('a:first-of-type', MatListItem).activated).toEqual(
          MockFeatures.base[0].activated
        );
        expect(
          ngMocks.formatText(ngMocks.find('a:first-of-type > mat-icon'))
        ).toEqual(MockFeatures.base[0].icon!);
        expect(ngMocks.formatText(ngMocks.find('a:first-of-type'))).toContain(
          MockFeatures.base[0].title
        );
      });

      it('should display a form menu item', () => {
        expect(ngMocks.get('a:nth-of-type(2)', RouterLink).routerLink).toEqual([
          MockFeatures.base[1].path,
        ]);
        expect(ngMocks.get('a:nth-of-type(2)', MatListItem).activated).toEqual(
          MockFeatures.base[1].activated
        );
        expect(ngMocks.find('a:nth-of-type(2) > mat-icon', null)).toBeNull();
        expect(ngMocks.formatText(ngMocks.find('a:nth-of-type(2)'))).toContain(
          MockFeatures.base[1].title
        );
      });

      it('should display a service menu item', () => {
        expect(ngMocks.get('a:last-of-type', RouterLink).routerLink).toEqual([
          MockFeatures.base[2].path,
        ]);
        expect(ngMocks.get('a:last-of-type', MatListItem).activated).toEqual(
          MockFeatures.base[2].activated
        );
        expect(ngMocks.find('a:last-of-type > mat-icon', null)).toBeNull();
        expect(ngMocks.formatText(ngMocks.find('a:last-of-type'))).toContain(
          MockFeatures.base[2].title
        );
      });
    });

    describe('Content', () => {
      it('should display a title for section', () => {
        expect(ngMocks.formatText(ngMocks.find('h2'))).toEqual('Examples :');
      });

      it('should have a router-outlet inside section', () => {
        console.log(fixture.componentInstance);
        expect(ngMocks.find('router-outlet')).not.toBeNull();
      });
    });
  });
});
