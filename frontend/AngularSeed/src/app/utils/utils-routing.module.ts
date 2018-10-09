import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
    { path: 'userprofilex', component: ProfileComponent },
    { path: 'mailboxx', component: ProfileComponent },
    { path: 'taskboxx', component: ProfileComponent }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class UtilsRoutingModule {}
