import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Observable } from 'rxjs';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let HeroServiceStub: Partial<HeroService>;

  HeroServiceStub = {
    getHeroes(): Observable<Hero[]> {
      return new Observable<Hero[]>();
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ], providers: [{provide: HeroService, useValue: HeroServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
