import { Component, OnInit, ReflectiveInjector } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { MonitorService } from '../monitor-service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  access_token: string;
  private monitorService: MonitorService;

  constructor(private heroService: HeroService, private confirmationDialogService: ConfirmationDialogService) {
    const injector = ReflectiveInjector.resolveAndCreate([ 
			MonitorService 
		]); 
		this.monitorService = injector.get(MonitorService); 
		this.logNavigation(); 
  }

  private logNavigation() { 
		this.monitorService.logPageView(); 
	} 

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string, role: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero(new Hero(name, role))
      .subscribe(() => {
        this.getHeroes();
      });
  }

  delete(hero: Hero): void {
    this.confirmationDialogService.confirm('Please confirm..', `Do you really want to delete ${hero.name} ?`)
      .then((confirmed) => {
        if (confirmed) {
          this.heroes = this.heroes.filter(h => h !== hero);
          this.heroService.deleteHero(hero).subscribe();
        }
      })
      .catch(() => {});
  }

}
