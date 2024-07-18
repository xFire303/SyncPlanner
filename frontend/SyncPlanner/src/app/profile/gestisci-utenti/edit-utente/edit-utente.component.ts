import { Component, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { GestisciUtentiService } from '../../../services/gestisci-utenti.service';

@Component({
  selector: 'app-edit-utente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    CommonModule,
  ],
  templateUrl: './edit-utente.component.html',
  styleUrl: './edit-utente.component.css',
})
export class EditUtenteComponent implements OnInit {
  utenti: any[] = [];
  idCurrentUser: number = 0;
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
    private gestisciUtentiService: GestisciUtentiService,
    private route: ActivatedRoute,
  ) {
    this.idCurrentUser = this.route.snapshot.params['id'];
  }

  editUtenteForm = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();

    this.gestisciUtentiService.getAllUsers().subscribe((data) => {
      this.utenti = data;
      const currentUser = data.find(
        (user: any) => user.id === String(this.idCurrentUser)
      );
      if (currentUser) {
        this.currentUserUsername = currentUser.username;

        this.initializeRoleCheckboxes(currentUser.ruoli_sede);
      }
    });
  }

  initializeRoleCheckboxes(ruoliSede: any[]) {
    this.roles.forEach((role) => {
      this.locations.forEach((location) => {
        const controlName = `${role}_${location}`;
        const hasRole = ruoliSede.some(
          (rs) => rs.sede_nome === location && rs.ruolo_nome === role
        );
        this.editUtenteForm.get(controlName)?.setValue(hasRole);
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
      .updateUserRoles(this.idCurrentUser, updatedRoles)
      .subscribe();
  }

  deleteUser() {
    this.gestisciUtentiService.deleteUser(this.idCurrentUser).subscribe();
  }
}
