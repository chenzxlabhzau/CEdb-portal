import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { EnhancerApiService } from '../enhancer-api.service';
import {eQTLRecord} from "src/app/shared/model/eQTL-record";


export class eqtlDataSource implements DataSource<eQTLRecord> {
  private eqtlRecordSubject = new BehaviorSubject<eQTLRecord[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public resultLength: number | undefined;

  constructor(private dataApiService: EnhancerApiService) {}

  loadeqtlRecords(enhancer_id: string, eqtlType:string,sortcol:string,sortOrder:string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);

    this.dataApiService
      .eqtlRecords(enhancer_id,eqtlType,sortcol,sortOrder, pageIndex, pageSize)
      .pipe(
        tap((val) => {
          this.resultLength = val.count;
        }),
        map((res) => res.result),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((rnas) => this.eqtlRecordSubject.next(rnas));
  }

  connect(collectionViewer: CollectionViewer): Observable<eQTLRecord[]> {
    return this.eqtlRecordSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.eqtlRecordSubject.complete();
    this.loadingSubject.complete();
  }
}
