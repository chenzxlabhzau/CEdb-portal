import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { SampleApiService } from '../sample-api.service';
import {tfRecord} from "src/app/shared/model/tf-record";


export class tfDataSource implements DataSource<tfRecord> {
  private tfRecordSubject = new BehaviorSubject<tfRecord[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public resultLength: number | undefined;

  constructor(private dataApiService: SampleApiService) {}

  loadtfRecords(sample_id: string, query:string, sortcol:string,sortOrder:string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);

    this.dataApiService
      .tfRecords(sample_id,query,sortcol,sortOrder, pageIndex, pageSize)
      .pipe(
        tap((val) => {
          this.resultLength = val.count;
        }),
        map((res) => res.result),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((rnas) => this.tfRecordSubject.next(rnas));
  }

  connect(collectionViewer: CollectionViewer): Observable<tfRecord[]> {
    return this.tfRecordSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.tfRecordSubject.complete();
    this.loadingSubject.complete();
  }
}
