import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
    @Input() titre:string = "Footer";
    @Input() texte:string = "Solution intelligente de gestion et d'analyse de données pour optimiser votre flux de travail quotidien.";

}
