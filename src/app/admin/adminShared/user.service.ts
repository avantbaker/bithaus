import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;

    constructor( private router: Router )  {
        firebase.initializeApp({
            apiKey: "AIzaSyACpOo4vh3RX4XW6kOad479zQvazt95XII",
            authDomain: "bithauscrypto.firebaseapp.com",
            databaseURL: "https://bithauscrypto.firebaseio.com",
            projectId: "bithauscrypto",
            storageBucket: "bithauscrypto.appspot.com",
            messagingSenderId: "102832287072"
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) { return true; }

        this.router.navigate(['/admin/login']);
        return false;
    }

    register(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                alert(`${error.message} Please Try Again!`);
            });
    }

    verifyUser() {
        this.authUser = firebase.auth().currentUser;

        if (this.authUser) {
            alert(`Welcome ${this.authUser.email}`);
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }

    }

    login(loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function(e) {
                alert(`${e.message} Unable to login. Try again!`);
            })
            .then(this.verifyUser.bind(this));
    }

    logout() {
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function() {
            alert(`Logged Out!`);
        }, function (e) {
            alert(`${e.message} Unable to logout. Try again!`);
        });
    }

}