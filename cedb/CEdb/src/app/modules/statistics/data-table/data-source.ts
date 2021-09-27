import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { DataApiService } from './data-api.service';
import { sampleRecord } from 'src/app/shared/model/sample-record';

export class sampleDataSource implements DataSource<sampleRecord> {
  private sampleRecordSubject = new BehaviorSubject<sampleRecord[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public resultLength: number | undefined;

  constructor(private dataApiService: DataApiService) {}

  loadsampleRecords(peak_type:string[],cancer_type: string, source_type:string[],chr:string, start, end, query:string, sortcol:string, sortOrder: string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);

    this.dataApiService
      .findsampleRecords(peak_type,cancer_type, source_type,chr, start, end,query, sortcol, sortOrder, pageIndex, pageSize)
      .pipe(
        tap((val) => {
          this.resultLength = val.count;
        }),
        map((res) => res.result),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((rnas) => this.sampleRecordSubject.next(rnas));
  }

  connect(collectionViewer: CollectionViewer): Observable<sampleRecord[]> {
    return this.sampleRecordSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.sampleRecordSubject.complete();
    this.loadingSubject.complete();
  }
}
