import { Component, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { RouterOutlet, RouterModule } from '@angular/router';

import { UserService } from '../services/user.service';

import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-accedi',
  standalone: true,
  templateUrl: './accedi.component.html',
  styleUrl: './accedi.component.css',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    RouterModule,
    RouterOutlet,
  ],
})
export class AccediComponent implements OnInit {
  message: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getErrorMessage$.subscribe((message) => {
      this.errorMessage = message;
    });
  }

  accediForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  submitForm() {
    if (this.accediForm.valid) {
      this.userService.getErrorMessage$.subscribe((message) => {
        this.errorMessage = message;
      });

      const userData = this.accediForm.value;

      this.userService.getSuccessMessage$.subscribe((message) => {
        this.message = message;
        if (this.message != '') {
          this.errorMessage = '';
        }
      });

      this.userService.login(userData).subscribe({});
    }
  }
}
