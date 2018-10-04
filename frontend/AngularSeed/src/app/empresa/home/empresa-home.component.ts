import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-empresa-home',
  templateUrl: './empresa-home.component.html',
  styleUrls: ['./empresa-home.component.scss'],
  animations: [routerTransition()]
})
export class EmpresaHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
