import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiquesComponents } from './boutiques.components';

describe('BoutiquesComponents', () => {
  let component: BoutiquesComponents;
  let fixture: ComponentFixture<BoutiquesComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiquesComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiquesComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
