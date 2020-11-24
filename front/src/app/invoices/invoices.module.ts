import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { UploadComponent } from './upload/upload.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  declarations: [UploadComponent, InvoiceListComponent],
  exports: [InvoiceListComponent]
})
export class InvoicesModule { }
