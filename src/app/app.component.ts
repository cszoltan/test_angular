import { Component } from '@angular/core';
import { Location }     from '@angular/common';
import { MsalService }  from './msal.service';
import { MonitorService } from './monitor-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Tour of Heroes';

  constructor(
    private monitorService: MonitorService,
    private location: Location,
    private msalService: MsalService
  ){}

  login(): void {
      this.msalService.login();
  }
  
  logout(): void {
      this.msalService.logout();
      sessionStorage.clear();
  };

  isActive(viewLocation: any): boolean {        
      return viewLocation === this.location.path();
  };

  isOnline(): boolean {
      return this.msalService.isOnline();
  };
}
