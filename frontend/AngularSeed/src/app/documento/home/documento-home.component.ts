import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-documento-home',
  templateUrl: './documento-home.component.html',
  styleUrls: ['./documento-home.component.scss'],
  animations: [routerTransition()]
})
export class DocumentoHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
