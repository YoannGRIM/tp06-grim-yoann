import { Component } from '@angular/core';
import { Client } from '../../models/client';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  accountForm: FormGroup;
  user?: Client;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.accountForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onClick(): void {
    this.apiService.getClientInfo().subscribe(data => {
      this.user = data;

      this.accountForm.patchValue({
        nom: this.user.nom,
        prenom: this.user.prenom,
        email: this.user.email
      });
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const updatedUser = {
        ...this.user,
        nom: this.accountForm.value.nom,
        prenom: this.accountForm.value.prenom,
        email: this.accountForm.value.email,
      };

      this.apiService.updateClientInfo(updatedUser).subscribe(response => {
        console.log('Utilisateur mis à jour avec succès', response);
      });

    } else {
      console.log('Le formulaire est invalide');
    }
  }

  onLogout(): void {
    localStorage.removeItem('token');
  }
}
