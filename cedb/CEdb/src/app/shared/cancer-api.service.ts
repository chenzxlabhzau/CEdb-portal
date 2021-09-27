import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/shared/base-http.service';


@Injectable({
  providedIn: 'root'
})
export class CancerApiService extends BaseHttpService {

  constructor(http: HttpClient) {
    // @ts-ignore
    super(http);
  }
    ListCancers(source_type=""): Observable<any> {
    return this.getData('data/cancers',{source_type:source_type});
  }
}
