import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'manager';
  mobile:Boolean = false;
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

  ngOnInit(){
    if(window.outerWidth <= 768){
      this.mobile = true;
    }else {
      this.mobile = false;
    }
  }

  openMenu(){
    let menu:any= document.querySelector('nav')
    menu.classList.add('active');
  }
  closeMenu(){
    let menu:any= document.querySelector('nav')
    menu.classList.remove('active');
  }
}
