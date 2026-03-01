import { Component, output, input, effect, signal, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-center-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-center-modal.component.html',
  styleUrl: './edit-center-modal.component.scss',
})

export class EditCenterModalComponent implements OnDestroy {
  centerData = input.required<any>();
  close = output<void>();
  submit = output<{data: any, file?: File}>();

  editForm: FormGroup;
  selectedFile?: File;
  imagePreview = signal<string | null>(null);

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      description: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jours: ['Tous les jours', Validators.required],
      heures: ['08h00 - 20h00', Validators.required]
    });

    // Remplit le formulaire quand les données arrivent
    effect(() => {
      const data = this.centerData();
      if (data) {
        this.editForm.patchValue({
          description: data.description,
          contact: data.contact,
          email: data.email,
          jours: data.horaires.jours,
          heures: data.horaires.heures
        });
        this.imagePreview.set(data.planImageUrl);
      }
    });

  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.selectedFile = input.files[0];
    this.imagePreview.set(
      URL.createObjectURL(this.selectedFile)
    );
  }

  save() {
    if (this.editForm.valid) {
      const rawValues = this.editForm.value;
      const payload = {
        description: rawValues.description,
        contact: rawValues.contact,
        email: rawValues.email,
        horaires: { jours: rawValues.jours, heures: rawValues.heures }
      };
      this.submit.emit({ data: payload, file: this.selectedFile });
    }
  }

  ngOnDestroy() {
    if (this.imagePreview()) {
      URL.revokeObjectURL(this.imagePreview()!);
    }
  }
}

