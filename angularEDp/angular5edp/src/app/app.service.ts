import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState implements CanActivate {
  _state: InternalStateType = { };

  constructor(private router: Router) {

  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
  canActivate() {
    var token=localStorage.getItem('token');
    if (token) { return true; }
    this.router.navigate(['auth/login']);
    return false;
  }
}
