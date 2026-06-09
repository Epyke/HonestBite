import { Injectable } from '@angular/core';
import { Session, User } from '@supabase/supabase-js';
import { Supabase } from '../supabase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private session: Session | null = null;

  constructor(private supabase: Supabase) {
    this.supabase.getSession().then(({ data }) => {
      this.session = data.session;
    });
  }

  async login(email: string, password: string): Promise<void> {
    const { error } = await this.supabase.signIn(email, password);
    if (error) throw error;
    const { data } = await this.supabase.getSession();
    this.session = data.session;
  }

  async register(email: string, password: string, username: string): Promise<void> {
    const { error } = await this.supabase.signUp(email, password, username);
    if (error) throw error;
  }

  async logout(): Promise<void> {
    await this.supabase.signOut();
    this.session = null;
  }

  get currentUser(): User | null {
    return this.session?.user ?? null;
  }

  get isLoggedIn(): boolean {
    return this.session !== null;
  }
}
