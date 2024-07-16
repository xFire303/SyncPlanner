import { Component } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestisci-profilo',
  standalone: true,
  imports: [
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './gestisci-profilo.component.html',
  styleUrl: './gestisci-profilo.component.css',
})
export class GestisciProfiloComponent {
  errorMessage = '';

  userUsername: string = '';

  userEmail: string = '';

  constructor(private userService: UserService, private router: Router) {
    this.userUsername = this.userService.getUserUsername();
    this.userEmail = this.userService.getUserEmail();

    this.profileForm.patchValue({
      username: this.userUsername,
      email: this.userEmail,
    });
  }

  profileForm = new FormGroup(
    {
      username: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
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
    if (this.profileForm.valid) {
      const { confermaPassword, ...userData } = this.profileForm.value;
      this.userService.changeCredentials(userData).subscribe({});
    }
  }
}
