import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Observable } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let HeroServiceStub: Partial<HeroService>;

  HeroServiceStub = {
    getHeroes(): Observable<Hero[]> {
      return new Observable<Hero[]>();
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ], providers: [{provide: HeroService, useValue: HeroServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
