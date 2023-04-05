import { Component } from '@angular/core';
import { features } from './shared/models/features.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly features = features;
}
