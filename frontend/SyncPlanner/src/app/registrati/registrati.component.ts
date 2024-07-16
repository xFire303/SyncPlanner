import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { MessagesModule } from 'primeng/messages';

import { RouterOutlet, RouterModule } from '@angular/router';

import { UserService } from '../services/user.service';

import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registrati',
  standalone: true,
  templateUrl: './registrati.component.html',
  styleUrl: './registrati.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    RouterModule,
    RouterOutlet,
    MessagesModule,
  ],
})
export class RegistratiComponent {

  constructor(private userService: UserService) {}

  registratiForm = new FormGroup(
    {
      nome: new FormControl<string>('', [
        Validators.required,
      ]),
      cognome: new FormControl<string>('', [
        Validators.required,
      ]),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}'
        ),
      ]),
      confermaPassword: new FormControl<string>('', Validators.required),
      terms: new FormControl<boolean>(false, Validators.requiredTrue),
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confermaPassword = control.get('confermaPassword')?.value;
    if (password !== confermaPassword) {
      control.get('confermaPassword')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('confermaPassword')?.setErrors(null);
    }
    return null;
  }

  submitForm() {
    if (this.registratiForm.valid) {
      const { confermaPassword, terms, ...userData } =
        this.registratiForm.value;
      this.userService
        .register(userData)
        .subscribe({})
    }
  }
}
