import { Component, OnInit } from '@angular/core';

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
  FormBuilder,
} from '@angular/forms';

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
export class RegistratiComponent implements OnInit {
  sedi = ['Verona', 'Padova', 'Milano', 'Roma', 'Napoli', 'Como'];

  message: string = '';

  almenoUnaSedeSelezionata = false;

  showRegistratiForm = true;

  errorMessage: string = '';

  sediForm: FormGroup = new FormGroup({});

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.sediForm.valueChanges.subscribe(() => {
      this.updateAlmenoUnaSedeSelezionata();
    });
  }

  initializeForm() {
    const formControls = this.sedi.reduce(
      (controls: { [key: string]: FormControl }, sede: string) => {
        controls[sede] = new FormControl(false);
        return controls;
      },
      {}
    );

    this.sediForm = this.fb.group(formControls);
  }

  registratiForm = new FormGroup(
    {
      nome: new FormControl<string>('', [Validators.required]),
      cognome: new FormControl<string>('', [Validators.required]),
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

  updateAlmenoUnaSedeSelezionata() {
    this.almenoUnaSedeSelezionata = Object.values(this.sediForm.value).includes(
      true
    );
  }

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

  goBack() {
    this.showRegistratiForm = true;
  }

  submitForm() {
    if (this.registratiForm.valid) {
      this.userService.checkIfEmailAlreadyExists(this.registratiForm.value).then(
        (emailExists) => {
          if (emailExists) {
            this.errorMessage = 'Esiste già un utente con questa email';
            this.showRegistratiForm = true;
          } else {
            this.showRegistratiForm = false;
          }
        }
      )
    }
  }

  submitSediForm() {
    if (
      this.sediForm.valid &&
      this.almenoUnaSedeSelezionata &&
      this.registratiForm.valid
    ) {
      const { confermaPassword, terms, ...userData } =
        this.registratiForm.value;
      const selectedSedi = Object.keys(this.sediForm.value).filter(
        (sede) => this.sediForm.value[sede]
      );

      this.userService.getSuccessMessage$.subscribe((message) => {
        this.message = message;
      });

      this.userService.register(userData, selectedSedi).subscribe({});
    }
  }
}
