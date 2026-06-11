import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonIcon, IonButton, IonAvatar
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline, mailOutline, callOutline,
  pencilOutline, logOutOutline, chatbubbleEllipsesOutline, addOutline, storefrontOutline, logInOutline
} from 'ionicons/icons';
import { CustomToolbarComponent } from '../../components/custom-toolbar/custom-toolbar.component';
import { userService } from 'src/app/services/user/user';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  name: string;
  email: string;
  memberSince: string;
}

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonContent, IonIcon, IonButton, IonAvatar,
    CustomToolbarComponent,
  ],
})
export class Tab4Page implements OnInit {

  public user:UserProfile = {
    name: '',
    email: '',
    memberSince: '',
  }

  constructor(private router: Router, private userService: userService) {
    addIcons({
      personOutline, mailOutline, callOutline,
      pencilOutline, logOutOutline, chatbubbleEllipsesOutline, addOutline, storefrontOutline, logInOutline
    });
  }

  ngOnInit(): void {
    if(this.isLoggedIn){
      const currentUser = this.userService.currentUser;
      this.user = {
        name: currentUser?.user_metadata['username'],
        email: currentUser?.email ?? '',
        memberSince: currentUser?.created_at ?? '',
      }
    }
  }

  editProfile(): void {
    this.router.navigateByUrl('/edit-profile');
  }

  login(): void {
    this.router.navigateByUrl('/login');
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }


  register(): void {
    this.router.navigateByUrl('/register');
  }

  openAddRestaurant(): void {
    this.router.navigate(['/add-restaurant']);
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  get currentUser(): User | null {
    return this.userService.currentUser;
  }
}