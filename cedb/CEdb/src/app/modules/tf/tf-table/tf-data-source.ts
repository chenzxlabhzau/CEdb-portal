import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { TfApiService } from './tf-api.service';
import {tfStatRecord} from "src/app/shared/model/tf-stat-record";


export class TfDataSource implements DataSource<tfStatRecord> {
  private tfstatRecordSubject = new BehaviorSubject<tfStatRecord[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public resultLength: number | undefined;

  constructor(private dataApiService: TfApiService) {}

  loadtfstatRecords(cancer_type:string,query:string,sortcol:string,sortOrder:string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);

    this.dataApiService
      .tfstatRecords(cancer_type,query,sortcol,sortOrder, pageIndex, pageSize)
      .pipe(
        tap((val) => {
          this.resultLength = val.count;
        }),
        map((res) => res.result),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((rnas) => this.tfstatRecordSubject.next(rnas));
  }

  connect(collectionViewer: CollectionViewer): Observable<tfStatRecord[]> {
    return this.tfstatRecordSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.tfstatRecordSubject.complete();
    this.loadingSubject.complete();
  }
}
