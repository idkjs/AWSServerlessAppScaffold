import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-pessoa-home',
  templateUrl: './pessoa-home.component.html',
  styleUrls: ['./pessoa-home.component.scss'],
  animations: [routerTransition()]
})
export class PessoaHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
