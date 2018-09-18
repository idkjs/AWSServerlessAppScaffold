import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
         MatSidenavModule, MatToolbarModule, MatListModule, MatCardModule } from '@angular/material';

@NgModule({
    imports: [
        MatFormFieldModule, MatInputModule, MatButtonModule,
        MatIconModule, MatSidenavModule, MatToolbarModule, MatListModule, MatCardModule
    ],
    exports: [
        MatFormFieldModule, MatInputModule, MatButtonModule,
        MatIconModule, MatSidenavModule, MatToolbarModule,
        MatListModule, MatCardModule
    ]
})
export class MaterialModule {}
