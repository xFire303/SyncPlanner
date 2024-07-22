import { Component, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { Router } from '@angular/router';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { GestisciUtentiService } from '../../../services/gestisci-utenti.service';
import { idStateService } from '../../../services/id-state.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-utente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    RouterModule,
  ],
  templateUrl: './edit-utente.component.html',
  styleUrl: './edit-utente.component.css',
})
export class EditUtenteComponent implements OnInit {
  utenti: any[] = [];
  idCurrentUser!: string;
  currentUserUsername: string = '';

  roles: string[] = ['guest', 'keyOwner', 'admin'];
  locations: string[] = [
    'Verona',
    'Padova',
    'Milano',
    'Roma',
    'Napoli',
    'Como',
  ];

  constructor(
    private userService: UserService,
    private gestisciUtentiService: GestisciUtentiService,
    private router: Router,
    private idStateService: idStateService
  ) {}

  editUtenteForm = new FormGroup({});

  utenteLoggato: any;
  sediAdminUtenteLoggato: string[] = [];
  sediKeyOwnerUtenteLoggato: string[] = [];

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe((data) => {
      this.utenteLoggato = data;

      this.sediAdminUtenteLoggato = this.utenteLoggato.ruoli_sede
        .filter((rs: any) => rs.ruolo_nome === 'admin')
        .map((rs: any) => rs.sede_nome);

      this.sediKeyOwnerUtenteLoggato = this.utenteLoggato.ruoli_sede
        .filter((rs: any) => rs.ruolo_nome === 'keyOwner')
        .map((rs: any) => rs.sede_nome);
    });

    this.idCurrentUser = this.idStateService.getSelectedUtenteId()!;

    this.initializeForm();

    this.gestisciUtentiService.getAllUsers().subscribe((data) => {
      this.utenti = data;
      const currentUser = data.find(
        (user: any) => user.id === String(this.idCurrentUser)
      );
      if (currentUser) {
        this.currentUserUsername = currentUser.username;

        this.initializeRoleCheckboxes(
          currentUser.ruoli_sede,
          this.sediAdminUtenteLoggato,
          this.sediKeyOwnerUtenteLoggato
        );
      }
    });
  }

  initializeRoleCheckboxes(
    ruoliSede: any[],
    ruoliSedeUtenteLoggato: string[] = [],
    ruoliSedeKeyOwner: string[] = []
  ) {
    const sediAdmin = ruoliSedeUtenteLoggato;
    const sediKeyOwner = ruoliSedeKeyOwner;

    this.roles.forEach((role) => {
      this.locations.forEach((location) => {
        const controlName = `${role}_${location}`;
        const hasRole = ruoliSede.some(
          (rs) => rs.sede_nome === location && rs.ruolo_nome === role
        );

        this.editUtenteForm.get(controlName)?.setValue(hasRole);

        if (!sediAdmin.includes(location) && !sediKeyOwner.includes(location)) {
          this.editUtenteForm.get(controlName)?.disable();
        }

        if (sediKeyOwner.includes(location) && role !== 'keyOwner') {
          this.editUtenteForm.get(controlName)?.disable();
        }
      });
    });
  }

  initializeForm() {
    this.roles.forEach((role) => {
      this.locations.forEach((location) => {
        const controlName = `${role}_${location}`;
        this.editUtenteForm.addControl(controlName, new FormControl(false));
      });
    });
  }

  submitForm() {
    const formData = this.editUtenteForm.value;
    const updatedRoles = [];

    for (const [key, value] of Object.entries(formData)) {
      if (value) {
        const [role, location] = key.split('_');
        updatedRoles.push({ sede_nome: location, ruolo_nome: role });
      }
    }

    this.gestisciUtentiService
      .updateUserRoles(+this.idCurrentUser, updatedRoles)
      .subscribe();
  }

  deleteUser() {
    this.gestisciUtentiService.deleteUser(+this.idCurrentUser).subscribe();
  }

  chiudi() {
    this.idStateService.clearSelectedUtenteId();
    this.router.navigate(['/profile/gestisci-utenti']);
  }
}
