import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { Observable } from 'rxjs';
import { EnhancerBasicInfo } from "../../shared/model/enhancer-basic-info";

@Injectable({
  providedIn: 'root'
})
export class EnhancerApiService extends BaseHttpService  {

  constructor(http: HttpClient) { super(http);  }
  public findSuperEnhancerBasicInfo(e: string): Observable<EnhancerBasicInfo> {
    return this.getData('enhancer/basic/' + e);
  }
  public eqtlRecords(e:string, eqtlType:string,sortcol:string,sortOrder:string, pageIndex = 0, pageSize = 10): Observable<any> {
    return this.getData('enhancer/eqtl', {
      enhancer_id: e,
      eqtlType:eqtlType,
      sortcol: sortcol,
      sort: sortOrder,
      page: pageIndex.toString(),
      size: pageSize.toString(),
    });
  }
}
