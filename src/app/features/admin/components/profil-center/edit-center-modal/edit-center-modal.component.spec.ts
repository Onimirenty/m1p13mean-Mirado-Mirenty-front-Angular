import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCenterModalComponent } from './edit-center-modal.component';

describe('EditCenterModalComponent', () => {
  let component: EditCenterModalComponent;
  let fixture: ComponentFixture<EditCenterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCenterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCenterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
