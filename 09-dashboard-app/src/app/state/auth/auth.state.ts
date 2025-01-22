import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AuthAction } from './auth.actions';

export class AuthStateModel {
  public isAuthenticated!: boolean;
}

const defaults = {
  isAuthenticated: false
};

@State<AuthStateModel>({
  name: 'auth',
  defaults
})
@Injectable()
export class AuthState {
  @Action(AuthAction)
  add({ getState, setState }: StateContext<AuthStateModel>, { payload }: AuthAction) {
    
  }
}
