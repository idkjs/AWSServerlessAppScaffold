import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { Observable } from 'rxjs';
import { Empresa } from '../empresa.types';
import { EmpresaService } from '../empresa.service';

@Component({ selector: 'app-empresa-home', templateUrl: './empresa-home.component.html', styleUrls: ['./empresa-home.component.scss'], animations: [routerTransition()] })
export class EmpresaHomeComponent implements OnInit {

  empresas: Observable<Empresa[]>;

  constructor(private service: EmpresaService, private router: Router) { }

  ngOnInit() {
    this.empresas = this.service.getAll();
  }

  gotTo() {
    // const path = '/empresa/' + this.tempProperty.empresaId;
    // console.log(path);
    // this.router.navigate([ path ]);
  }

}
