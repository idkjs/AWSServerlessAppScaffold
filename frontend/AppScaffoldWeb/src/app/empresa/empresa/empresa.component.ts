import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {

    const response = this.http.get<String>('http://localhost:8080/products/123').toPromise().then(console.log).catch(console.log);

  }

}
