import { IAuth } from "../../models/auth.model";

export class LoginAction {
  static readonly type = '[Auth] Login';
  constructor(public payload: { authCredentials: IAuth }) { }
}

export class LogoutAction {
  static readonly type = '[Auth] Logout';
  
}
