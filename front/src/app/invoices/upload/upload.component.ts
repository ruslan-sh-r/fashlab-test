import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { InvoicesService } from './../../services/invoices.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild('file')
  file: ElementRef;
  progress: Observable<number>;
  uploaded = false;
  error: string;
  validationError: Subject<string>;

  constructor(private invoiceService: InvoicesService, private dialogRef: MatDialogRef<UploadComponent>) { }

  ngOnInit(): void {
  }

  addFile() {
    this.uploaded = false;
    this.progress = null;
    this.error = null;
    this.validationError = null;
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const file = this.file.nativeElement.files.length > 0 ? this.file.nativeElement.files[0] : null;
    if (file) {
      this.validationError = new Subject<string>();
      this.progress = this.invoiceService.upload(file, this.validationError);
      this.progress.subscribe({
        next: () => {},
        error: err => {
          this.error = err;
        },
        complete: () => {
          this.uploaded = true;
        }
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close(!this.error);
  }

}
