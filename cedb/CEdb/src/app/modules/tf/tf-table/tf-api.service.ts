import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/shared/base-http.service';


@Injectable({
  providedIn: 'root'
})
export class TfApiService extends BaseHttpService  {

  constructor(http: HttpClient) {
    // @ts-ignore
    super(http);
  }
  tfstatRecords(cancer_type:string,query:string,sortcol:string,sortOrder:string, pageIndex = 0, pageSize = 10): Observable<any> {
    return this.getData('search/tfstat', {
      cancer_type: cancer_type,
      query:query,
      sortcol:sortcol,
      sort: sortOrder,
      page: pageIndex.toString(),
      size: pageSize.toString(),
    });
  }
}
