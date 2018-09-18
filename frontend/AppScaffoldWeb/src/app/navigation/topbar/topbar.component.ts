import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnDestroy {

  isAuth = false;
  authSubscription: Subscription;

  @Output() sidenavToggle = new EventEmitter<void>();
  topBarItems = [
    {caption: 'Login', link: '/login', isVisible: !this.isAuth},
    {caption: 'Registro', link: '/signup', isVisible: !this.isAuth},
    {caption: 'Logout', link: '/logout', isVisible: this.isAuth}
  ];

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authSubscription = this.authService.authChange.subscribe(authStatus => { this.isAuth = authStatus; });

  }

  ngOnDestroy() {

    this.authSubscription.unsubscribe();

  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
