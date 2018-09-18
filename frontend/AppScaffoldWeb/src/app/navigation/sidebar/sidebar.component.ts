import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();
  navBarItems = [
    {icon: 'face', caption: 'Empresa', link: '/empresa'},
    {icon: 'face', caption: 'Beneficiários', link: '/pessoas'},
    {icon: 'face', caption: 'Processos', link: '/processos'},
    {icon: 'face', caption: 'Documentos', link: '/documentos'},
    {icon: 'face', caption: 'Finanças', link: '/financas'}
  ];

  constructor() { }

  ngOnInit() { }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
