import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterProfilComponent } from './center-profil.component';

describe('CenterProfilComponent', () => {
  let component: CenterProfilComponent;
  let fixture: ComponentFixture<CenterProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
