import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private api = `${environment.apiUrl}/invoices`;

  constructor(private http: HttpClient) { }

  public get(): Observable<Invoice[]> {
    const url = this.api;
    return this.http.get<Invoice[]>(url);
  }

  public upload(file: File, validationError: Subject<string>): Observable<number> {
    const url = `${this.api}/upload`;
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true
    });
    const progress = new Subject<number>();

    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        const percentDone = Math.round(100 * event.loaded / event.total);
        progress.next(percentDone);
      } else if (event instanceof HttpResponse) {
        const errors: string[] = (event.body as any).validationErrors;
        if (errors.length > 0){
          const str = errors.join(';  ');
          validationError.next(str);
          validationError.complete();
        }
        progress.complete();
      }
    }, err => progress.error(err.error.message));

    return progress;
  }

}
