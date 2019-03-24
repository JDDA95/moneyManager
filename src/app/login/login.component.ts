import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  activeForm:any='login';

  constructor() { }

  ngOnInit() {
  }

  viewInputs(event) {
    let input:any = event.target
    if(input.value != ''){
      input.nextSibling.classList.add('active');
    }else {
      input.nextSibling.classList.remove('active');
    }
  }

}
