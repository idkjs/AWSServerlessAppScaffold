import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({ selector: 'app-navigation', templateUrl: './navigation.component.html', styleUrls: ['./navigation.component.scss'] })
export class NavigationComponent implements OnInit {

  collapedSideBar: boolean;

  constructor(private router: Router) {}

  ngOnInit() {}

  receiveCollapsed($event) {
      this.collapedSideBar = $event;
  }

  navigateTo(route: string) { this.router.navigate([ route]); }

}
