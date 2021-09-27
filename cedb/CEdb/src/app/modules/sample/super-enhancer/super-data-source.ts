import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { SampleApiService } from '../sample-api.service';
import {superRecord} from "src/app/shared/model/super-record";


export class superDataSource implements DataSource<superRecord> {
  private superRecordSubject = new BehaviorSubject<superRecord[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public resultLength: number | undefined;

  constructor(private dataApiService: SampleApiService) {}

  loadsuperRecords(sample_id: string, query:string, sortcol:string,sortOrder:string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);

    this.dataApiService
      .superRecords(sample_id,query,sortcol,sortOrder, pageIndex, pageSize)
      .pipe(
        tap((val) => {
          this.resultLength = val.count;
        }),
        map((res) => res.result),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((rnas) => this.superRecordSubject.next(rnas));
  }

  connect(collectionViewer: CollectionViewer): Observable<superRecord[]> {
    return this.superRecordSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.superRecordSubject.complete();
    this.loadingSubject.complete();
  }
}
