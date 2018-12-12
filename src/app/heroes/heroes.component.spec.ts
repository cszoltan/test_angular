import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Hero } from '../hero';
import { Observable } from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let HeroServiceStub: Partial<HeroService>;
  let ConfirmationDialogServiceStub: Partial<ConfirmationDialogService>;

  HeroServiceStub = {
    getHeroes(): Observable<Hero[]> {
      return new Observable<Hero[]>();
    }
  };

  ConfirmationDialogServiceStub = {
    confirm(title: string,
      message: string,
      btnOkText: string = 'OK',
      btnCancelText: string = 'Cancel',
      dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {});
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ], providers: [{provide: HeroService, useValue: HeroServiceStub}, {provide: ConfirmationDialogService, useValue: ConfirmationDialogServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
