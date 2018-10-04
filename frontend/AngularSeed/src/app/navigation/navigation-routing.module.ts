import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            { path: 'home', component: HomeComponent },
            { path: 'empresa', loadChildren: '../empresa/empresa.module#EmpresaModule' },
            { path: 'pessoa', loadChildren: '../pessoa/pessoa.module#PessoaModule' },
            { path: 'documento', loadChildren: '../documento/documento.module#DocumentoModule' },
            { path: 'charts', loadChildren: '../layout/charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: '../layout//tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: '../layout//form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: '../layout//bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: '../layout//grid/grid.module#GridModule' },
            { path: 'components', loadChildren: '../layout//bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: '../layout//blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NavigationRoutingModule {}
