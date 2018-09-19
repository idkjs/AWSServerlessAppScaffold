import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [],
    imports: [CommonModule, MaterialModule, FormsModule, FlexLayoutModule, HttpClientModule],
    exports: [CommonModule, MaterialModule, FormsModule, FlexLayoutModule, HttpClientModule]
})
export class SharedModule {}
