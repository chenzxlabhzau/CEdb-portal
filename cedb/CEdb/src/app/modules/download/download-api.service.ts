import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/shared/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadApiService extends BaseHttpService {

  constructor(http: HttpClient) {
    // @ts-ignore
    super(http);
  }

  findDownloadRecords(query="", pageIndex = 0, pageSize = 10): Observable<any> {
    return this.getData('download/download', {
      query:query.toString(),
      page: pageIndex.toString(),
      size: pageSize.toString(),
    });
  }
}
