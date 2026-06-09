import { Injectable } from '@angular/core';
import { getSupabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private db = getSupabase();

  signUp(email: string, password: string, username: string) {
    return this.db.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
  }

  signIn(email: string, password: string) {
    return this.db.auth.signInWithPassword({ email, password });
  }

  signOut() {
    return this.db.auth.signOut();
  }

  getSession() {
    return this.db.auth.getSession();
  }
}
