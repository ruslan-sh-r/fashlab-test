import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Invoice } from '../../models/invoice';
import { InvoicesService } from '../../services/invoices.service';
import { UploadComponent } from '../upload/upload.component';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  displayedColumns: string[] = ['IncomingId', 'Amount', 'DueDate', 'SellingPrice'];

  matDataSource: MatTableDataSource<Invoice>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private invoiceService: InvoicesService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

  loadData() {
    this.invoiceService.get().subscribe(data => {
      this.matDataSource = new MatTableDataSource<Invoice>(data);
      this.matDataSource.paginator = this.paginator;
    });
  }
}
