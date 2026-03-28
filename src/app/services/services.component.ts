import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  icon: string;
  title: string;
  description: string;
  items: string[];
  featured: boolean;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  activeIndex = -1;

  services: Service[] = [
    {
      icon: '⚖️',
      title: 'Droit Pénal',
      description: 'Défense rigoureuse face aux juridictions pénales, des affaires correctionnelles aux crimes les plus graves.',
      items: [
        'Défense en cour d\'assises',
        'Droit pénal des affaires',
        'Garde à vue & détention provisoire',
        'Appel et cassation pénale'
      ],
      featured: false
    },
    {
      icon: '🏢',
      title: 'Droit des Affaires',
      description: 'Conseil et contentieux pour les entreprises, de la startup à la multinationale, en France et à l\'international.',
      items: [
        'Fusions & acquisitions',
        'Contrats commerciaux complexes',
        'Restructuration d\'entreprise',
        'Arbitrage international'
      ],
      featured: true
    },
    {
      icon: '🏠',
      title: 'Droit Immobilier',
      description: 'Sécurisation de vos transactions immobilières et résolution des litiges fonciers avec expertise.',
      items: [
        'Transactions immobilières',
        'Copropriété & baux',
        'Construction & urbanisme',
        'Contentieux locatif'
      ],
      featured: false
    },
    {
      icon: '👨‍👩‍👧',
      title: 'Droit de la Famille',
      description: 'Accompagnement bienveillant et discret dans les moments délicats de votre vie familiale.',
      items: [
        'Divorce & séparation',
        'Garde d\'enfants & autorité parentale',
        'Successions & héritages',
        'Adoption & tutelle'
      ],
      featured: false
    },
    {
      icon: '💼',
      title: 'Droit du Travail',
      description: 'Protection des salariés et conseil aux employeurs pour naviguer le droit social français.',
      items: [
        'Licenciements & ruptures',
        'Discrimination & harcèlement',
        'Négociation d\'accords collectifs',
        'Prud\'hommes & contentieux'
      ],
      featured: false
    },
    {
      icon: '🌍',
      title: 'Droit International',
      description: 'Expertise cross-border pour les litiges et transactions impliquant plusieurs juridictions.',
      items: [
        'Arbitrage commercial international',
        'Droit de l\'Union Européenne',
        'Investissements transfrontaliers',
        'Droits de l\'homme & CEDH'
      ],
      featured: false
    }
  ];
}
