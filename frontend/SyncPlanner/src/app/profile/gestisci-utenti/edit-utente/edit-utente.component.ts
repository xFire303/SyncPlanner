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
  idSelectedUser!: string;
  currentUserUsername: string = '';

  roles: string[] = ['guest', 'keyOwner', 'admin'];
  locations: string[] = [
    'verona',
    'padova',
    'milano',
    'roma',
    'napoli',
    'como',
  ];

  constructor(
    private userService: UserService,
    private gestisciUtentiService: GestisciUtentiService,
    private router: Router,
    private idStateService: idStateService
  ) {}

  editUtenteForm = new FormGroup({});

  utenteLoggato: any;
  sediRoleUtenteSelezionato: any;
  sediAdminUtenteLoggato: string[] = [];
  sediKeyOwnerUtenteLoggato: string[] = [];

  ngOnInit(): void {
    this.userService.getCurrentUserSediRole().subscribe((sediRole) => {
      this.utenteLoggato = sediRole;

      this.sediAdminUtenteLoggato = this.utenteLoggato
        .filter((rs: any) => rs.role.name === 'admin')
        .map((rs: any) => rs.sede.name);

      this.sediKeyOwnerUtenteLoggato = this.utenteLoggato
        .filter((rs: any) => rs.role.name === 'keyOwner')
        .map((rs: any) => rs.sede.name);
    });

    this.idSelectedUser = this.idStateService.getSelectedUtenteId()!;

    this.initializeForm();

    this.gestisciUtentiService.getAllUsers().subscribe((data) => {
      this.utenti = data;

      const currentUserRecords = data.filter(
        (utente: any) => utente.user.id === +this.idSelectedUser
      );

      if (currentUserRecords.length > 0) {
        this.currentUserUsername = currentUserRecords[0].user.username;

        this.sediRoleUtenteSelezionato = currentUserRecords.map(
          (record: any) => ({
            ruolo_nome: record.role.name,
            sede_nome: record.sede.name,
          })
        );

        // Crea la rolesMap per l'utente che stai modificando
        const rolesMap = this.createRolesMap(
          this.sediRoleUtenteSelezionato, // Usa i ruoli dell'utente che stai modificando
          this.sediAdminUtenteLoggato,
          this.sediKeyOwnerUtenteLoggato
        );

        // Inizializza i checkbox in base ai ruoli e sedi dell'utente
        this.initializeRoleCheckboxes(rolesMap);
      }
    });
  }

  initializeRoleCheckboxes(rolesMap: any) {
    this.locations.forEach((location) => {
      this.roles.forEach((role) => {
        const controlName = `${role}_${location}`;
        const hasRole = rolesMap[location] && rolesMap[location][role];
        const control = this.editUtenteForm.get(controlName);

        // Imposta il valore per la selezione del ruolo
        control?.setValue(hasRole);

        // Disabilita i ruoli per le sedi dove l'utente loggato non è admin
        if (!this.sediAdminUtenteLoggato.includes(location)) {
          control?.disable(); // Disabilita solo il controllo
        } else {
          control?.enable(); // Abilita per i ruoli amministrativi
        }

        control?.valueChanges.subscribe((isSelected: boolean) => {
          if (isSelected) {
            this.unselectOtherRolesForLocation(location, role);
          }
        });
      });
    });
  }

  createRolesMap(
    ruoliSede: any[], // Ruoli dell'utente da modificare
    sediAdmin: string[], // Sedi dove l'utente loggato è 'admin'
    sediKeyOwner: string[] // Sedi dove l'utente loggato è 'keyOwner'
  ): any {
    const rolesMap: any = {};

    this.locations.forEach((location) => {
      // Inizializza la mappa per ogni sede
      rolesMap[location] = {};

      this.roles.forEach((role) => {
        // Verifica se l'utente da modificare ha il ruolo in questa sede
        const hasRole = ruoliSede.some(
          (rs) => rs.sede_nome === location && rs.ruolo_nome === role
        );

        // Assegna il valore per questa sede e ruolo
        rolesMap[location][role] = hasRole;

        // Disabilita i ruoli per le sedi dove l'utente loggato non è 'admin'
        if (!sediAdmin.includes(location)) {
          rolesMap[location][role] = false; // Non cambia il valore se è già selezionato, ma disabilita
        }
      });
    });

    console.log(rolesMap);

    return rolesMap;
  }

  unselectOtherRolesForLocation(location: string, selectedRole: string) {
    this.roles.forEach((role) => {
      if (role !== selectedRole) {
        const controlName = `${role}_${location}`;
        this.editUtenteForm.get(controlName)?.setValue(false);
      }
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
        updatedRoles.push({ sedeName: location, roleName: role });
      }
    }

    this.gestisciUtentiService
      .updateUserRoles(+this.idSelectedUser, updatedRoles)
      .subscribe();
  }

  deleteUser() {
    this.gestisciUtentiService.deleteUser(+this.idSelectedUser).subscribe();
  }

  chiudi() {
    this.idStateService.clearSelectedUtenteId();
    this.router.navigate(['/profile/gestisci-utenti']);
  }
}
