import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { Observable } from 'rxjs';
import { DataSumRecord} from "src/app/shared/model/data-sum-record";

@Injectable({
  providedIn: 'root'
})
export class DataSumApiService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http);
  }
  public findDataSum(): Observable<DataSumRecord> {
    return this.getData('home/datasum');
  }

}
