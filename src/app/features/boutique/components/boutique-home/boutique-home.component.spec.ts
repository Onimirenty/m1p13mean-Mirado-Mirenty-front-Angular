import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueHomeComponent } from './boutique-home.component';

describe('BoutiqueHomeComponent', () => {
  let component: BoutiqueHomeComponent;
  let fixture: ComponentFixture<BoutiqueHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
