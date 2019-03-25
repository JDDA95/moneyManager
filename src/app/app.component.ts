import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'manager';
  headerHide:Boolean = false;
  constructor(private router:Router){
    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd){
        if(e.url == '/'){
          this.headerHide = true;
        }else {
          this.headerHide = false;
        }
      }
    });
  }
}
