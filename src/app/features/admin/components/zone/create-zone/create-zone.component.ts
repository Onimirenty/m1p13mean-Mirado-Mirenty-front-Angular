import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-zone',
  imports: [ReactiveFormsModule],
  templateUrl: './create-zone.component.html',
  styleUrl: './create-zone.component.scss',
})
export class CreateZoneComponent {
close = output<void>();
  submitZone = output<any>();

  zoneForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.zoneForm = this.fb.group({
      etage: ['RDC', Validators.required],
      bloc: ['', Validators.required],
      box: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  save() {
    if (this.zoneForm.valid) {
      this.submitZone.emit(this.zoneForm.value);
    }
  }
}
