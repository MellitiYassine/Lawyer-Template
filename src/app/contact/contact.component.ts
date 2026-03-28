import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactDetail {
  icon: string;
  label: string;
  value: string;
}

interface Hour {
  day: string;
  time: string;
}

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  domaine: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  submitted = false;
  currentYear = new Date().getFullYear();

  formData: FormData = {
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    domaine: '',
    message: ''
  };

  contactDetails: ContactDetail[] = [
    {
      icon: '📍',
      label: 'Adresse',
      value: '12, Avenue de l\'Opéra — 75001 Paris, France'
    },
    {
      icon: '📞',
      label: 'Téléphone',
      value: '+33 (0)1 42 86 55 20'
    },
    {
      icon: '✉️',
      label: 'E-mail',
      value: 'contact@dupont-avocats.fr'
    },
    {
      icon: '🚇',
      label: 'Accès',
      value: 'Métro Palais-Royal · RER A Châtelet-Les-Halles'
    }
  ];

  hours: Hour[] = [
    { day: 'Lundi – Vendredi', time: '9h00 – 19h00' },
    { day: 'Samedi', time: '10h00 – 14h00' },
    { day: 'Dimanche', time: 'Fermé' }
  ];

  domaines: string[] = [
    'Droit Pénal',
    'Droit des Affaires',
    'Droit Immobilier',
    'Droit de la Famille',
    'Droit du Travail',
    'Droit International',
    'Autre domaine'
  ];

  onSubmit(): void {
    if (!this.formData.prenom || !this.formData.email || !this.formData.message) {
      return;
    }
    console.log('Formulaire soumis :', this.formData);
    this.submitted = true;
  
  }
}
