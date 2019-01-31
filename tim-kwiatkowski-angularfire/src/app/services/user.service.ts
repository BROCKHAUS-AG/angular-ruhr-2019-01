import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { first, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private zone: NgZone
  ) { }

  signInWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(() => {
        this.zone.run(() => this.router.navigateByUrl('/hometown'));
      }, err => console.error('Error signing in', err));
  }

  isLoggedIn(withRedirect?: boolean): Observable<boolean> {
    return this.afAuth.authState.pipe(
      first(),
      map(user => {
        this.currentUser = user;
        return !!user;
      }),
      tap(isLoggedIn => {
        if (!isLoggedIn && withRedirect) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
