import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Observable } from 'rxjs';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let HeroServiceStub: Partial<HeroService>;

  HeroServiceStub = {
    getHero(): Observable<Hero> {
      return new Observable<Hero>();
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ], imports: [FormsModule], providers: [{provide: HeroService, useValue: HeroServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
