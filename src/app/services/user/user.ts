import { Injectable } from '@angular/core';
import { Session, User } from '@supabase/supabase-js';
import { Supabase } from '../supabase';

@Injectable({ providedIn: 'root' })
export class userService {
  private session: Session | null = null;

  constructor(private supabase: Supabase) {
    this.supabase.getSession().then(({ data }) => {
      this.session = data.session;
    });
  }

  //Inicio de sessão de um utilizador no supabase
  async login(email: string, password: string): Promise<void> {
    const { error } = await this.supabase.signIn(email, password);
    if (error) throw error;
    const { data } = await this.supabase.getSession();
    this.session = data.session;
  }

  //Criação de utilizador no supabase
  async register(email: string, password: string, username: string): Promise<void> {
    const { error } = await this.supabase.signUp(email, password, username);
    if (error) throw error;
  }

  //Operação asíncrona de logout do utilizador no supabase
  async logout(): Promise<void> {
    await this.supabase.signOut();
    this.session = null;
  }

  async loadSession(): Promise<void> {
    const { data } = await this.supabase.getSession();
    this.session = data.session;
  }

  get currentUser(): User | null {
    return this.session?.user ?? null;
  }

  get isLoggedIn(): boolean {
    return this.session !== null;
  }

}
