import { Component, OnInit, ReflectiveInjector } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MonitorService } from '../monitor-service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
})
export class SearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  private monitorService: MonitorService;

  constructor(private heroService: HeroService) {
    const injector = ReflectiveInjector.resolveAndCreate([ 
			MonitorService 
		]); 
		this.monitorService = injector.get(MonitorService); 
		this.logNavigation(); 
  }

  private logNavigation() { 
		this.monitorService.logPageView(); 
	} 

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
