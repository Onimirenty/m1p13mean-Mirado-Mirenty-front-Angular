import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-annonce',
  imports: [ReactiveFormsModule],
  templateUrl: './create-annonce.component.html',
  styleUrl: './create-annonce.component.scss',
})
export class CreateAnnonceComponent {
  close = output<void>();
  submitAnnonce = output<{ title: string; content: string }>();

  annonceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.annonceForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  save() {
    if (this.annonceForm.valid) {
      this.submitAnnonce.emit(this.annonceForm.value);
    }
  }
}
function ngOutput<T>() {
  throw new Error('Function not implemented.');
}

