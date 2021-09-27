import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/shared/base-http.service';


@Injectable({
  providedIn: 'root'
})
export class DataApiService extends BaseHttpService {

  constructor(http: HttpClient) {
    // @ts-ignore
    super(http);
  }
    findsampleRecords(cancer_type: string[], source_type:string[],query="", sortOrder:string, pageIndex = 0, pageSize = 10): Observable<any> {
    return this.getData('data/sample', {
      cancer_type: cancer_type,
      source_type: source_type,
      query:query.toString(),
      sort: sortOrder,
      page: pageIndex.toString(),
      size: pageSize.toString(),
    });
  }
}
