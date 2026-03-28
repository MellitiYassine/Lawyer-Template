import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Credential {
  icon: string;
  title: string;
  detail: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  credentials: Credential[] = [
    {
      icon: '⚖️',
      title: 'Barreau de Paris',
      detail: 'Inscrite depuis 1998 · Membre du Conseil de l\'Ordre'
    },
    {
      icon: '🎓',
      title: 'Université Paris I Panthéon-Sorbonne',
      detail: 'Master II Droit des Affaires Internationales · Major de promotion'
    },
    {
      icon: '🏆',
      title: 'Classement Chambers & Partners 2024',
      detail: 'Reconnue parmi les 50 meilleurs cabinets de France'
    },
    {
      icon: '🌍',
      title: 'Langues pratiquées',
      detail: 'Français, Anglais, Espagnol — plaidoiries internationales'
    }
  ];
}
