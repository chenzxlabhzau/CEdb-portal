import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { Observable } from 'rxjs';
import { SampleBasicInfo } from 'src/app/shared/model/sample-basic-info';

@Injectable({
  providedIn: 'root'
})
export class SampleApiService extends BaseHttpService {

  constructor(http: HttpClient) { super(http); }
   public findSampleBasicInfo(s: string): Observable<SampleBasicInfo> {
    return this.getData('sample/basic/' + s);
  }
  public PieTypical(s: string): Observable<any>{
    return this.getData('sample/pietypical/' + s);
  }
    public PieSuper(s: string): Observable<any>{
    return this.getData('sample/piesuper/' + s);
  }
  public superRecords(s:string, query:string, sortcol:string,sortOrder:string, pageIndex = 0, pageSize = 10): Observable<any> {
    return this.getData('sample/super', {
      sample_id:s,
      query:query,
      sortcol:sortcol,
      sort: sortOrder,
      page: pageIndex.toString(),
      size: pageSize.toString(),
    });
  }
    public typicalRecords(s:string, query:string, sortcol:string,sortOrder:string, pageIndex = 0, pageSize = 10): Observable<any> {
    return this.getData('sample/typical', {
      sample_id:s,
      query:query,
      sortcol:sortcol,
      sort: sortOrder,
      page: pageIndex.toString(),
      size: pageSize.toString(),
    });
  }
  public tfRecords(s:string, query:string, sortcol:string,sortOrder:string, pageIndex = 0, pageSize = 10): Observable<any> {
    return this.getData('sample/tf', {
      sample_id:s,
      query:query.replace("(","%28").replace(")","%29"),
      sortcol:sortcol,
      sort: sortOrder,
      page: pageIndex.toString(),
      size: pageSize.toString(),
    });
  }


}
