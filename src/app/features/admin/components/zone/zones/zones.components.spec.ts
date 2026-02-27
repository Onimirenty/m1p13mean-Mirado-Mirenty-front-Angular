import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesComponents } from './zones.components';

describe('ZonesComponents', () => {
  let component: ZonesComponents;
  let fixture: ComponentFixture<ZonesComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonesComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonesComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
