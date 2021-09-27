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
    findsampleRecords(peak_type:string[],cancer_type: string, source_type:string[],
                      chr:string, start, end, query="",sortcol:string,sortOrder:string, pageIndex = 0, pageSize = 10): Observable<any> {
    return this.getData('statistics/table', {
      peak_type: peak_type,
      cancer_type: cancer_type,
      source_type: source_type,
      chr:chr,
      start:start.toString(),
      end:end.toString(),
      query:query,
      sortcol:sortcol,
      sort: sortOrder,
      page: pageIndex.toString(),
      size: pageSize.toString(),
    });
  }
}
