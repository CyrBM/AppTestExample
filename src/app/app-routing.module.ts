import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FormPageComponent } from './form-page/form-page.component';

const routes: Routes = [
  { title: 'Home', path: 'home', component: LandingPageComponent },
  { title: 'Form', path: 'form', component: FormPageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
