import { IAuth } from "../../models/auth.model";
import { IRefreshToken } from "../../models/refresh-token.model";

export class LoginAction {
  static readonly type = '[Auth] Login';
  constructor(public payload: { authCredentials: IAuth }) { }
}

export class LogoutAction {
  static readonly type = '[Auth] Logout';
  
}
export class CheckAuthAction {
  static readonly type = '[Auth] Check Auth';
  
}

export class RefreshTokenAction {
  static readonly type = '[Auth] Refresh token';
  constructor(public payload: { refreshToken: IRefreshToken }) { }
}