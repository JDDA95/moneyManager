import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth,private router: Router) {
    this.user = afAuth.authState;
    console.log(this.user)
  }

  signup(email: string, password: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.router.navigate(['/inicio']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  login(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log(value)
        console.log('Nice, it worked!');
        this.router.navigate(['/inicio']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
