import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ZodFormValidators } from '../shared/services/zod-form-validators.service';
import { LoginSchema } from '../shared/shemas/login.shema';
import { TrimOnBlurDirective } from '../shared/services/trim-on-blur-directive';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-login.component',
  imports: [ReactiveFormsModule,TrimOnBlurDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm:FormGroup = new FormGroup({
      username: new FormControl(null, { validators: [ZodFormValidators.fromZod(LoginSchema.shape.username)] }),
      password: new FormControl<string|null>(null, { validators: [ZodFormValidators.fromZod(LoginSchema.shape.password)] })
  });
  constructor(private authService:AuthService, private router:Router, private notificationService: NotificationService){}

  submit(){
    const value = this.loginForm.getRawValue(); //Récupérer l’état brut du formulaire
    const parsed = LoginSchema.safeParse(value); // Valider les données contre le schéma métier
    if (!parsed.success) return;

    const role = this.authService.login(parsed.data.username, parsed.data.password);
    if (!role) this.notificationService.showError("authentification echoué! veuillez verifier votre nom d'utilisateur et mot de passe");
    // Redirection selon rôle
    switch (role) {
      case 'admin': this.router.navigate(['/admin']); break;
      case 'boutique': this.router.navigate(['/boutique']); break;
      case 'client': this.router.navigate(['/client']); break;
    }
  }
}
