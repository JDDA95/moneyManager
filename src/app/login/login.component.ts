import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  activeForm:any='login';

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  public viewInputs(event) {
    let input:any = event.target
    if(input.value != ''){
      input.nextSibling.classList.add('active');
    }else {
      input.nextSibling.classList.remove('active');
    }
  }

  signupBtn() {
    let element1:any = document.querySelector('#email'),
        element2:any = document.querySelector('#password'),
        email:any = element1.value,
        pass:any = element2.value;
    this.auth.signup(email, pass);
    document.querySelector('form').reset();
  }

  signInBtn(){
    let element1:any = document.querySelector('#email'),
        element2:any = document.querySelector('#password'),
        email:any = element1.value,
        pass:any = element2.value;
    this.auth.login(email, pass);
    document.querySelector('form').reset();
  }

}
