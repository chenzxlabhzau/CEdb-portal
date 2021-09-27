import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/shared/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class SuperApiService extends BaseHttpService  {

  constructor(http: HttpClient) {
    // @ts-ignore
    super(http);
  }
  superRecords(source_type: string, cancer_type:string,query:string,chr:string,start:number,end:number,sortcol:string,sortOrder:string, pageIndex = 0, pageSize = 10): Observable<any> {
    return this.getData('search/super', {
      cancer_type: cancer_type,
      source_type: source_type,
      query:query,
      chr:chr,
      start:start,
      end:end,
      sortcol:sortcol,
      sort: sortOrder,
      page: pageIndex.toString(),
      size: pageSize.toString(),
    });
  }
}
