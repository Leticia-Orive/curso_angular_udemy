import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCocktailsComponent } from './detail-cocktails.component';

describe('DetailCocktailsComponent', () => {
  let component: DetailCocktailsComponent;
  let fixture: ComponentFixture<DetailCocktailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCocktailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCocktailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
