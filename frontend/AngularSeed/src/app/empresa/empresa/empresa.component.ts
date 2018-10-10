import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { Observable } from 'rxjs';
import { Empresa } from '../empresa.types';
import { EmpresaService } from '../empresa.service';

@Component({ selector: 'app-empresa', templateUrl: './empresa.component.html', styleUrls: ['./empresa.component.scss'], animations: [routerTransition()] })
export class EmpresaComponent implements OnInit {

  empresaId: string;
  tempProperty: Observable<Empresa>;

  constructor(private service: EmpresaService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.empresaId = this.route.snapshot.paramMap.get('empresaId');
    this.tempProperty = this.service.getById(this.empresaId);

  }

}
