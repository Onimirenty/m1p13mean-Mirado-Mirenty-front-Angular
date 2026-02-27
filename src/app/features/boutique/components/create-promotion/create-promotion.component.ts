import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-promotion',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-promotion.component.html',
  styleUrl: './create-promotion.component.scss',
})
export class CreatePromotionComponent {
  close = output<void>();
  submitPromo = output<any>();

  promoForm: FormGroup;
  imagePreview = signal<string | null>(null);

  constructor(private fb: FormBuilder) {
    this.promoForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(5)]],
      taux: [0, [Validators.min(1), Validators.max(100)]],
      prixInitial: [0],
      prixReduit: [0],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      image: [null]
    });

    // Calcul automatique du prix réduit si le taux change
    this.promoForm.get('taux')?.valueChanges.subscribe(t => this.calculatePrice());
    this.promoForm.get('prixInitial')?.valueChanges.subscribe(p => this.calculatePrice());
  }

  private calculatePrice() {
    const pInitial = this.promoForm.get('prixInitial')?.value || 0;
    const taux = this.promoForm.get('taux')?.value || 0;
    if (pInitial > 0 && taux > 0) {
      const pReduit = pInitial - (pInitial * taux / 100);
      this.promoForm.get('prixReduit')?.patchValue(Math.round(pReduit), { emitEvent: false });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.promoForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => this.imagePreview.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  save() {
    if (this.promoForm.valid) this.submitPromo.emit(this.promoForm.value);
  }
}
