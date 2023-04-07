import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserApiService } from '../shared/services/user-api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@UntilDestroy()
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  private readonly userService = inject(UserApiService);
  users$ = this.userService.getAllUsers().pipe(untilDestroyed(this));
}
