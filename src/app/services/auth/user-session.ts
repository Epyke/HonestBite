import { CurrentUser } from '../../models/user.model';

export class UserSession {
  private static readonly TOKEN_KEY = 'hb_token';
  private static readonly USER_KEY = 'hb_user';

  private static _user: CurrentUser | null = null;

  static set(user: CurrentUser, token: string): void {
    UserSession._user = user;
    localStorage.setItem(UserSession.TOKEN_KEY, token);
    localStorage.setItem(UserSession.USER_KEY, JSON.stringify(user));
  }

  static get(): CurrentUser | null {
    if (UserSession._user) return UserSession._user;
    const raw = localStorage.getItem(UserSession.USER_KEY);
    UserSession._user = raw ? (JSON.parse(raw) as CurrentUser) : null;
    return UserSession._user;
  }

  static get token(): string | null { return localStorage.getItem(UserSession.TOKEN_KEY); }
  static get isLoggedIn(): boolean { return !!UserSession.token; }

  static clear(): void {
    UserSession._user = null;
    localStorage.removeItem(UserSession.TOKEN_KEY);
    localStorage.removeItem(UserSession.USER_KEY);
  }
}
